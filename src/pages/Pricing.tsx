
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <div className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Simple, transparent pricing</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Choose the perfect plan for your needs. All plans include core features.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Free Plan */}
          <div className="flex flex-col rounded-2xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold leading-8">Free</h3>
            <p className="mt-4 text-sm text-muted-foreground">Perfect for getting started with basic functionality.</p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight">$0</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {["5 messages per day", "Basic chat modes", "24-hour chat history"].map((feature) => (
                <li key={feature} className="flex">
                  <Check className="h-5 w-5 flex-shrink-0 text-akram-purple" />
                  <span className="ml-3">{feature}</span>
                </li>
              ))}
            </ul>
            <Link to="/signup" className="mt-8">
              <Button variant="outline" className="w-full">Sign up</Button>
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="relative flex flex-col rounded-2xl border border-akram-purple p-6 shadow-sm">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-akram-purple text-white px-4 py-1 rounded-full text-sm font-medium">
              Popular
            </div>
            <h3 className="text-lg font-semibold leading-8">Premium</h3>
            <p className="mt-4 text-sm text-muted-foreground">Everything in Free, plus enhanced features.</p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight">$12</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Unlimited messages",
                "All chat modes",
                "Unlimited chat history",
                "Priority support",
                "File upload (5MB limit)"
              ].map((feature) => (
                <li key={feature} className="flex">
                  <Check className="h-5 w-5 flex-shrink-0 text-akram-purple" />
                  <span className="ml-3">{feature}</span>
                </li>
              ))}
            </ul>
            <Link to="/signup" className="mt-8">
              <Button className="w-full">Get started</Button>
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col rounded-2xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold leading-8">Enterprise</h3>
            <p className="mt-4 text-sm text-muted-foreground">Custom solutions for larger teams and organizations.</p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight">$49</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Everything in Premium",
                "Custom AI training",
                "Dedicated account manager",
                "API access",
                "File upload (25MB limit)",
                "Custom integrations",
                "SSO & advanced security"
              ].map((feature) => (
                <li key={feature} className="flex">
                  <Check className="h-5 w-5 flex-shrink-0 text-akram-purple" />
                  <span className="ml-3">{feature}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="mt-8">
              <Button variant="outline" className="w-full">Contact sales</Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 bg-muted p-8 rounded-2xl">
          <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {[
              {
                q: "Can I change my plan later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans."
              },
              {
                q: "Do you offer refunds?",
                a: "Yes, we offer a 14-day money-back guarantee if you're not satisfied with your subscription."
              },
              {
                q: "Can I use AkramVerse for commercial purposes?",
                a: "Yes, all plans allow for commercial usage. The Enterprise plan includes additional features for business needs."
              }
            ].map((faq, i) => (
              <div key={i}>
                <h4 className="font-medium">{faq.q}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
