
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
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>

        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="mb-4 font-medium">Effective Date: 4/5/2025</p>
          
          <p className="mb-6">At PricePanda, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully.</p>
          
          <h2 className="text-2xl font-semibold mb-3 mt-6">1. Information We Collect</h2>
          <p className="mb-4">We may collect information about you in various ways, including:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Personal Data:</strong> While using our service, we may ask you to provide certain personally identifiable information that can be used to contact or identify you, including your name, email address, and phone number.</li>
            <li><strong>Usage Data:</strong> We may also collect information on how the service is accessed and used, including your computer's Internet Protocol address, browser type, pages visited, time spent on those pages, and other diagnostic data.</li>
            <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our service and hold certain information.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-3 mt-6">2. How We Use Your Information</h2>
          <p className="mb-4">We may use the information we collect for various purposes, including to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide and maintain our service</li>
            <li>Notify you about changes to our service</li>
            <li>Provide customer support</li>
            <li>Monitor the usage of our service</li>
            <li>Detect, prevent, and address technical issues</li>
            <li>Provide you with news, special offers, and general information about other goods, services, and events</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-3 mt-6">3. Disclosure of Your Information</h2>
          <p className="mb-4">We may disclose your information in the following situations:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>To Service Providers:</strong> To facilitate our service, provide the service on our behalf, perform service-related services, or assist us in analyzing how our service is used.</li>
            <li><strong>For Business Transfers:</strong> In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
            <li><strong>To Comply with Law:</strong> We may disclose your information where required to do so by law or in response to valid requests by public authorities.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-3 mt-6">4. Security of Your Information</h2>
          <p className="mb-4">The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
          
          <h2 className="text-2xl font-semibold mb-3 mt-6">5. Your Data Protection Rights</h2>
          <p className="mb-4">If you are a resident of the European Economic Area (EEA), you have certain data protection rights. PricePanda aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</p>
          <p className="mb-4">If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please contact us.</p>
          
          <h2 className="text-2xl font-semibold mb-3 mt-6">6. Changes to This Privacy Policy</h2>
          <p className="mb-4">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
          
          <h2 className="text-2xl font-semibold mb-3 mt-6">7. Contact Us</h2>
          <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@pricepanda.com" className="text-blue-600 hover:underline">privacy@pricepanda.com</a> or through the Contact Us page on our website.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
