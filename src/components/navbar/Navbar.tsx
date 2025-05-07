
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../theme/ThemeToggle";
import { Logo } from "./Logo";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  isLoggedIn?: boolean;
}

export default function Navbar({ isLoggedIn = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-background/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link to="/" className="flex flex-shrink-0 items-center">
              <Logo />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <Link to="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link to="/chat" className="text-sm font-medium hover:text-primary">
                Chat
              </Link>
              <Link to="/pricing" className="text-sm font-medium hover:text-primary">
                Pricing
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <Link to="/dashboard">
                <Button variant="default">Dashboard</Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="ml-1">
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <MobileMenu open={mobileMenuOpen} isLoggedIn={isLoggedIn} />
    </nav>
  );
}
