
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";

interface Store {
  name: string;
  price: string;
  model: string;
  discount: string;
  link: string;
}

interface ProductDetails {
  id: string;
  title: string;
  image: string;
  lowestPrice: string;
  stores: Store[];
  description: string;
  features: string[];
}

// Sample product data - in a real app, this would come from an API
const sampleProducts: Record<string, ProductDetails> = {
  "2": {
    id: "2",
    title: "Apple iPhone 15 (128 GB) - Black",
    image: "/lovable-uploads/4f458e42-099d-428f-8054-c54ebd3e07e8.png",
    lowestPrice: "₹60,900",
    stores: [
      { name: "Amazon", price: "₹76,990", model: "iPhone 15 (2023)", discount: "12%", link: "https://amazon.com" },
      { name: "Flipkart", price: "₹82,990", model: "iPhone 15 (2023)", discount: "5.2%", link: "https://flipkart.com" },
    ],
    description: "15.4 cm (6.1-inch) Super Retina XDR display, Dynamic Island, A16 Bionic chip, 48MP main camera with 2x telephoto, USB-C connector",
    features: [
      "Processor: A16 Bionic chip (5-core CPU & GPU)",
      "Memory: 6 GB RAM",
      "Storage: 128 GB",
      "Display: 6.1-inch Super Retina XDR",
      "Camera: 48MP main with 2x telephoto",
      "Audio: Spatial Audio support",
      "Battery: Up to 15 hours video playback"
    ]
  },
  "5": {
    id: "5",
    title: "Apple MacBook Air Laptop with M2 chip with 8 GB RAM / 512 GB SSD",
    image: "https://m.media-amazon.com/images/I/71LAlGbpGOL._SL1500_.jpg",
    lowestPrice: "₹60,900",
    stores: [
      { name: "Amazon", price: "₹76,990", model: "MacBook Air M2 (2023)", discount: "49%", link: "https://amazon.com" },
      { name: "Flipkart", price: "₹1,02,990", model: "MacBook Air M2 (2023)", discount: "6.2%", link: "https://flipkart.com" },
    ],
    description: "34.46 cm (13.6-inch) Liquid Retina Display, 8GB RAM, 512GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera. Works with iPhone/iPad; Space Grey",
    features: [
      "Processor: Apple M2 chip (8-core CPU & GPU)",
      "Memory: 8 GB unified RAM",
      "Storage: 512 GB SSD",
      "Display: 13.6\" Liquid Retina (2560×1664)",
      "Camera: 1080p FaceTime HD",
      "Audio: 4-speaker system with Spatial Audio",
      "Battery: Up to 18 hours"
    ]
  }
};

const ProductCompare = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    // Redirect to login if not logged in
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // In a real app, fetch product details from an API
    if (productId && sampleProducts[productId]) {
      setProduct(sampleProducts[productId]);
    } else if (productId === "1") {
      // Fallback for demo purposes
      setProduct(sampleProducts["5"]);
    } else {
      // Default to MacBook if no ID or ID not found
      setProduct(sampleProducts["5"]);
    }
  }, [productId, isLoggedIn, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F2DA]">
        <div className="text-center">
          <div className="text-2xl font-bold">Loading product details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F2DA]">
      <div className="container mx-auto py-8 px-4">
        {/* Back button */}
        <Link to="/deals" className="flex items-center mb-6 text-black hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Back to products</span>
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image */}
          <div className="lg:w-1/2 bg-white rounded-3xl p-8 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title}
              className="max-h-96 object-contain"
            />
          </div>
          
          {/* Product Details */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium">Lowest Price: <span className="text-green-600 font-bold">{product.lowestPrice}</span></p>
                  <p className="text-sm text-gray-600">Available from {product.stores.length} stores</p>
                </div>
                <button className="p-2" aria-label="Add to wishlist">
                  <Heart className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 mb-4"
            >
              View Best Deal
            </Button>
            
            <div className="flex gap-2 mb-8">
              {product.stores.map((store, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  className="flex-1 border border-gray-300 bg-[#f8f8f8] text-black hover:bg-gray-200"
                  asChild
                >
                  <a href={store.link} target="_blank" rel="noopener noreferrer">
                    {store.name}: {store.price}
                  </a>
                </Button>
              ))}
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
          </div>
        </div>
        
        {/* Stores Comparison Table */}
        <div className="mt-8 mb-16">
          <Table className="border rounded-xl overflow-hidden">
            <TableHeader className="bg-amber-100">
              <TableRow>
                <TableHead className="text-black">Store</TableHead>
                <TableHead className="text-black">Price</TableHead>
                <TableHead className="text-black">Model</TableHead>
                <TableHead className="text-black">Discount (%)</TableHead>
                <TableHead className="text-black">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.stores.map((store, index) => (
                <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <TableCell>{store.name}</TableCell>
                  <TableCell>{store.price}</TableCell>
                  <TableCell>{store.model}</TableCell>
                  <TableCell>{store.discount}</TableCell>
                  <TableCell>
                    <a 
                      href={store.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {store.name} link
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
          <ul className="list-disc pl-6 space-y-4">
            {product.features.map((feature, index) => (
              <li key={index} className="text-lg">{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductCompare;
