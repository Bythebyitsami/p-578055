
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Share2, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "SAMSUNG 8.5 kg 5 star Semi Automatic Top Load Washing Machine",
    image: "/lovable-uploads/108fe49d-0ebf-49d4-8555-7624c47c5f4f.png",
    price: "₹13,490",
    rating: "4.4",
    stores: 3
  },
  {
    id: 2,
    title: "Apple iPhone 15 (128 GB) - Black",
    image: "/lovable-uploads/4f458e42-099d-428f-8054-c54ebd3e07e8.png",
    price: "₹60,900",
    rating: "4.5",
    stores: 3
  },
  {
    id: 3,
    title: "Sony WH-1000XM4",
    image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_UF1000,1000_QL80_.jpg",
    price: "₹19,740",
    rating: "4.5",
    stores: 3
  },
  {
    id: 4,
    title: "Logitech MX Master 3S",
    image: "https://m.media-amazon.com/images/I/61ni3t1ryQL._SL1500_.jpg",
    price: "₹7,995",
    rating: "4.7",
    stores: 4
  },
  {
    id: 5,
    title: "Apple MacBook Air Laptop with M2 chip with 8 GB RAM / 512 GB SSD",
    image: "https://m.media-amazon.com/images/I/71LAlGbpGOL._SL1500_.jpg",
    price: "₹78,990",
    rating: "4.4",
    stores: 3
  },
  {
    id: 6,
    title: "Minimalist Anti-Acne Salicylic Acid 2% Face Wash with LHA",
    image: "https://m.media-amazon.com/images/I/61Yl83RXSsL._SL1500_.jpg",
    price: "₹284",
    rating: "4.1",
    stores: 4
  }
];

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  return (
    <Card className="bg-white rounded-3xl overflow-hidden h-full flex flex-col">
      <div className="p-4 flex-1 flex flex-col">
        <div className="relative mb-4 flex items-center justify-center bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="h-48 object-contain mx-auto"
          />
          <div className="absolute top-0 right-0 flex gap-2">
            <button className="hover:opacity-80 transition-opacity" aria-label="Add to favorites">
              <Heart className="w-5 h-5" />
            </button>
            <button className="hover:opacity-80 transition-opacity" aria-label="Share product">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium line-clamp-2 flex-1 pr-2">{product.title}</h3>
            <div className="bg-green-500 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap">
              {product.rating} ★
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="font-bold">From {product.price}</div>
            <div className="text-xs text-gray-600">{product.stores} stores</div>
          </div>

          <Link to="/login">
            <Button className="w-full bg-black text-white hover:bg-gray-800">
              Compare Prices
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

const Deals = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Raleway:wght@400;500&family=Trocchi&family=Montserrat:wght@700&display=swap"
        rel="stylesheet"
      />
      <main className="min-h-screen mx-auto bg-amber-300">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            className="mb-6 border-2 border-black hover:bg-black hover:text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous Page
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">Today's Best Deals</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Save big with these special offers and discounts across multiple stores
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Deals;
