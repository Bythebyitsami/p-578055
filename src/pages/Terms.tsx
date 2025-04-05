
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="container mx-auto">
        <Button 
          variant="outline" 
          className="mb-6 border-2 border-black hover:bg-black hover:text-white"
          asChild
        >
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>

        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-6">By accessing and using PandaPricePoint, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.</p>
          
          <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
          <p className="mb-4">Permission is granted to temporarily use PandaPricePoint for personal, non-commercial purposes. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose;</li>
            <li>Attempt to reverse engineer any software contained on PandaPricePoint;</li>
            <li>Remove any copyright or other proprietary notations from the materials;</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
          <p className="mb-6">The materials on PandaPricePoint are provided "as is". PandaPricePoint makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          
          <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
          <p className="mb-6">In no event shall PandaPricePoint be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use PandaPricePoint, even if PandaPricePoint or a PandaPricePoint authorized representative has been notified orally or in writing of the possibility of such damage.</p>
          
          <h2 className="text-2xl font-semibold mb-4">5. Revisions</h2>
          <p className="mb-6">The materials appearing on PandaPricePoint could include technical, typographical, or photographic errors. PandaPricePoint does not warrant that any of the materials on its website are accurate, complete or current. PandaPricePoint may make changes to the materials contained on its website at any time without notice.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
