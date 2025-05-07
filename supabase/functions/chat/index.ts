
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { OpenAI } from 'https://esm.sh/openai@4.97.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY') || ''

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get Authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Initialize Supabase client with the access token
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false }
    })
    
    // Get the user data from the auth header
    const { data: { user }, error: userError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
    
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token or user not found' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Parse request body
    const { messages, mode } = await req.json()
    
    // Get the system prompt based on mode
    let systemPrompt = "You are a helpful assistant."
    
    switch (mode) {
      case "tutor":
        systemPrompt = "You are an expert tutor assistant. Explain concepts in detail with examples. Be educational, patient, and encouraging."
        break
      case "writer":
        systemPrompt = "You are a professional content writer assistant. Help create engaging, well-structured content. Provide creative suggestions and refinements."
        break
      case "developer":
        systemPrompt = "You are an experienced developer assistant. Provide code explanations, debugging help, and programming advice with code examples when relevant."
        break
      case "support":
        systemPrompt = "You are a friendly customer support assistant. Be helpful, empathetic, and solution-oriented when addressing user concerns."
        break
    }
    
    // Add system message at the beginning
    const conversationHistory = [
      { role: "system", content: systemPrompt },
      ...messages
    ]

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: conversationHistory,
      temperature: 0.7,
      max_tokens: 800,
    })
    
    const aiResponse = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response."
    
    // Return the AI response
    return new Response(JSON.stringify({ 
      response: aiResponse,
      userId: user.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
