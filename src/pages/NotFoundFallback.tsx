
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFoundFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
      <h1 className="text-6xl font-bold text-akram-purple">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        We couldn't find the page you were looking for. The link might be broken, or the page may have been removed.
      </p>
      <div className="mt-8">
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}
