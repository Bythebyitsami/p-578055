
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="container mx-auto">
        <Button 
          variant="outline" 
          className="mb-6 border-2 border-black hover:bg-black hover:text-white"
          asChild
        >
          <Link to="/login">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
          </Link>
        </Button>

        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="mb-4">This is a placeholder for the Privacy Policy page.</p>
          <p className="text-gray-500">Full content will be provided later.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
