import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
const Wishlist = () => {
  const [animateIn, setAnimateIn] = useState(false);
  const {
    isLoggedIn
  } = useAuth();
  useEffect(() => {
    setAnimateIn(true);
  }, []);
  return <div className="min-h-screen bg-[#d9f0ff]">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <h1 className="text-5xl font-bold text-center my-12">My Wishlist</h1>
        
        <div className={`transition-opacity duration-700 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
          {isLoggedIn ? <EmptyWishlist /> : <NotLoggedInWishlist />}
        </div>
      </div>
    </div>;
};
const EmptyWishlist = () => {
  return <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-10 text-center">
      <div className="flex justify-center mb-6">
        <Heart className="h-24 w-24 text-gray-300" />
      </div>
      
      <h2 className="text-3xl font-bold mb-4">Your wishlist is empty</h2>
      
      <p className="text-lg mb-8">
        Save your favorite products to keep track of the best deals across different stores.
      </p>
      
      <Button asChild className="px-6 py-6 rounded-full">
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          <span>Browse Products</span>
        </Link>
      </Button>

      <div className="max-w-[200px] absolute bottom-0 left-10">
        <img alt="Panda mascot with coffee" className="w-full" src="/lovable-uploads/b8408168-10c9-4e69-8394-c7ca627dbfc8.jpg" />
      </div>
    </div>;
};
const NotLoggedInWishlist = () => {
  return <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-10 text-center">
      <div className="flex justify-center mb-6">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" className="h-24 w-24 text-gray-300" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 3L21 7V21H7V3H17Z"></path>
          <path d="M11 13L13 15L17 11"></path>
          <path d="M11 9H16"></path>
          <path d="M11 17H16"></path>
          <path d="M3 3H7V21"></path>
        </svg>
      </div>
      
      <h2 className="text-3xl font-bold mb-4">Please log in to view your wishlist</h2>
      
      <p className="text-lg mb-8">
        Log in to your account to save products to your wishlist and track prices across different stores.
      </p>
      
      <div className="flex justify-center gap-4">
        <Button asChild className="px-6 py-6 rounded-full bg-blue-500 hover:bg-blue-600">
          <Link to="/login">
            Login
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="px-6 py-6 rounded-full border-2">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <span>Browse Products</span>
          </Link>
        </Button>
      </div>
    </div>;
};
export default Wishlist;