
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Raleway:wght@400;500&family=Trocchi&family=Montserrat:wght@700&display=swap"
        rel="stylesheet"
      />
      <main className="min-h-screen mx-auto bg-[#d9f0ff]">
        <div className="px-10 py-5 max-w-7xl mx-auto">
          <Header />
          
          <div className="flex flex-col items-center mt-12">
            <h1 className="text-5xl font-bold mb-10">Contact Us</h1>
            
            <div className="w-full max-w-4xl bg-white rounded-lg p-8 shadow-md flex flex-col md:flex-row gap-8 mx-auto">
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4 text-center">Get in Touch</h2>
                <p className="text-center mb-6">
                  Have questions about our services or need 
                  help with your account? We're here to help!
                  Fill out the form or use the contact
                  information provided.
                </p>
                
                <div className="flex justify-center mt-6">
                  <div className="rounded-full bg-green-100 p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1">Name</label>
                    <Input id="name" placeholder="Your Name" className="w-full" />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <Input id="email" type="email" placeholder="Your Email" className="w-full" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-1">Message</label>
                    <Textarea id="message" placeholder="Your Message" className="w-full min-h-[120px]" />
                  </div>
                  
                  <Button 
                    asChild
                    className="w-full py-6 rounded-full font-medium flex items-center justify-center gap-2"
                  >
                    <Link to="/">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M7 12h10" />
                        <path d="M12 7v10" />
                      </svg>
                      Browse Products
                    </Link>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-10 max-w-[200px]">
          <img 
            src="/lovable-uploads/d4886316-de59-4387-ba96-097a78b20aee.png" 
            alt="Panda mascot with coffee" 
            className="w-full"
          />
        </div>
      </main>
    </>
  );
};

export default Contact;
