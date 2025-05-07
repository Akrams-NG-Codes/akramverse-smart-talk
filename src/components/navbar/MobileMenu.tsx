
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  open: boolean;
  isLoggedIn?: boolean;
}

export default function MobileMenu({ open, isLoggedIn = false }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="sm:hidden">
      <div className="space-y-1 px-4 pb-3 pt-2">
        <Link to="/" className="block px-3 py-2 text-base font-medium">
          Home
        </Link>
        <Link to="/chat" className="block px-3 py-2 text-base font-medium">
          Chat
        </Link>
        <Link to="/pricing" className="block px-3 py-2 text-base font-medium">
          Pricing
        </Link>
        {isLoggedIn ? (
          <Link to="/dashboard" className="block px-3 py-2">
            <Button className="w-full">Dashboard</Button>
          </Link>
        ) : (
          <div className="flex flex-col space-y-2 mt-4">
            <Link to="/login">
              <Button variant="outline" className="w-full">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button className="w-full">Sign up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
