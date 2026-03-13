import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Page Not Found
        </h2>
        <p className="text-foreground/60 mb-8 max-w-md">
          Sorry, the page you're looking for doesn't exist. Let's get you back
          on track.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
