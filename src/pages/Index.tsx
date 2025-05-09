import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// This is our index page that will redirect to the landing page
const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the landing page
    navigate("/");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Loading groupj...</h1>
        <div className="animate-pulse bg-akram-purple h-1 w-64 mx-auto rounded"></div>
      </div>
    </div>
  );
};

export default Index;
