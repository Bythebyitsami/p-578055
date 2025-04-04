
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Raleway:wght@400;500&family=Trocchi&family=Montserrat:wght@700&display=swap"
        rel="stylesheet"
      />
      <main className="min-h-screen mx-auto bg-[#d9f0ff]">
        <div className="px-10 py-5 max-w-7xl mx-auto">
          <Header />
          
          <div className="mt-16 max-w-4xl mx-auto relative">
            <h1 className="text-5xl font-bold text-center mb-10">About Us</h1>
            
            <div className="bg-white/70 backdrop-blur-md rounded-lg p-8 shadow-md mb-10 relative z-10">
              <h2 className="text-2xl font-bold mb-2">Who We Are</h2>
              <p className="mb-6">
                Price Panda is your ultimate shopping sidekick, making online shopping smarter, faster, and
                more efficient. We are dedicated to helping shoppers find the best deals across multiple e-
                commerce platforms, ensuring that you never overpay for a product again.
              </p>
              
              <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
              <p className="mb-6">
                Our mission is simple: to save your time and money by providing real-time price
                comparisons, top deals, and a seamless shopping experience. Say goodbye to endless
                browsing and let Price Panda do the hard work for you.
              </p>
              
              <h2 className="text-2xl font-bold mb-2">How It Works</h2>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li>Search for a product – Enter the name of the item you're looking for.</li>
                <li>Compare prices instantly – Get real-time price comparisons from multiple e-commerce platforms.</li>
                <li>Choose the best deal – Find the most cost-effective option and get redirected to purchase it.</li>
              </ol>
              
              <h2 className="text-2xl font-bold mb-2">Why Choose Price Panda?</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Real-Time Price Comparisons: No more switching between tabs; we fetch the best deals for you.</li>
                <li>Wishlist Feature: Save your favorite products and track price drops.</li>
                <li>User-Friendly Interface: A simple and seamless experience designed for hassle-free shopping.</li>
                <li>Top Deals Section: Handpicked best discounts across categories to help you save more.</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-2">What Shoppers Say</h2>
              <div className="mb-6">
                <p className="italic">"Price Panda has completely changed the way I shop online. Finding the best deal has never been this easy!" – Ayesha K.</p>
                <p className="italic">"The wishlist feature is a game-changer. Now I can track my favorite items and buy them at the right time." – Rahul M.</p>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Our Partners</h2>
              <p className="mb-6">
                We work with leading e-commerce platforms to bring you accurate and up-to-date pricing,
                ensuring transparency and reliability in every deal.
              </p>
              
              <h2 className="text-2xl font-bold mb-2">Join Us</h2>
              <p>
                Start shopping smart with Price Panda today! Compare, save, and shop with confidence.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button
                asChild
                className="bg-white px-6 py-3 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                <Link to="/">Browse Products</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-10 max-w-[200px] z-0">
          <img 
            src="/lovable-uploads/84e9f789-caf9-45ea-9324-6047bba92bae.png" 
            alt="Panda mascot with coffee" 
            className="w-full"
          />
        </div>
      </main>
    </>
  );
};

export default About;
