import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20 sm:py-32">
        <h1 className="text-4xl sm:text-6xl font-bold max-w-3xl mx-auto leading-tight">
          Smart Conversations.
          <span className="bg-gradient-to-r from-akram-purple to-akram-blue-DEFAULT bg-clip-text text-transparent">
            {" "}Infinite Possibilities.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          groupj leverages GPT-4 to create intelligent, context-aware conversations. 
          Choose from multiple chat modes tailored to your specific needs.
        </p>
        <div className="mt-10 flex gap-4">
          <Link to="/signup">
            <Button size="lg" className="text-md px-8">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/chat">
            <Button variant="outline" size="lg" className="text-md">
              Try for Free
            </Button>
          </Link>
        </div>
        
        {/* Feature Preview */}
        <div className="mt-16 w-full max-w-5xl mx-auto overflow-hidden rounded-xl border shadow-xl">
          <div className="relative aspect-video bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-2xl mx-auto p-4">
                <div className="glass-card p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="font-semibold">groupj Chat</div>
                    <div className="text-sm px-3 py-1 bg-akram-purple text-white rounded-full">Tutor Mode</div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <div className="chat-bubble-user">
                        Can you explain how quantum computing works?
                      </div>
                    </div>
                    <div className="flex">
                      <div className="chat-bubble-ai">
                        Quantum computing harnesses quantum mechanics to process information in new ways. Unlike classical bits that are either 0 or 1, quantum bits (qubits) can exist in multiple states simultaneously through superposition...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Powerful Features</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              groupj offers a wide range of features to enhance your AI chat experience
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Multiple Chat Modes",
                description: "Switch between Tutor, Writer, Developer, and Support modes for tailored assistance."
              },
              {
                title: "Session Memory",
                description: "groupj remembers your conversation context for more natural interactions."
              },
              {
                title: "Voice Input",
                description: "Speak directly to the AI using voice-to-text functionality."
              },
              {
                title: "Dark Mode",
                description: "Work comfortably in any lighting with our light and dark themes."
              },
              {
                title: "Mobile Friendly",
                description: "Access groupj on any device with our responsive design."
              },
              {
                title: "Secure & Private",
                description: "Your conversations are encrypted and your data is protected."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-background rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-akram-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="mt-4 max-w-2xl mx-auto">
            Join thousands of users who are already experiencing the power of AI conversations.
          </p>
          <div className="mt-8">
            <Link to="/signup">
              <Button variant="secondary" size="lg" className="text-akram-purple">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
