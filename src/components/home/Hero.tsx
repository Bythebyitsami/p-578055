
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function Hero() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    setIsHeroVisible(true);
  }, []);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate('/deals');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 lg:py-24 px-4">
      <div
        className={`transition-all duration-700 ${
          isHeroVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10"
        }`}
      >
        {isLoggedIn ? (
          <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-6">
            Hey {user?.firstName}, your Price Panda adventure starts now!
          </h1>
        ) : (
          <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-6">
            Never Overpay Again!
          </h1>
        )}
        <p className="text-xl md:text-2xl text-center mb-10 max-w-2xl mx-auto">
          Price Panda compares prices across top retailers to help you find the best deals and lowest prices for your favorite products.
        </p>
        <div className="flex justify-center">
          <Button
            size="lg"
            className="text-xl py-6 px-10 bg-black text-white hover:bg-gray-800"
            onClick={handleButtonClick}
          >
            {isLoggedIn ? "Compare Now" : "Get Started"}
          </Button>
        </div>
      </div>
    </div>
  );
}
