
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/components/home/SearchBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, ArrowLeft, ExternalLink } from "lucide-react";

// Mock data for demonstration
interface ProductData {
  id: string;
  title: string;
  image: string;
  store: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating?: string;
  url: string;
  isBestPrice: boolean;
}

interface GroupedProduct {
  id: string;
  title: string;
  image: string;
  lowestPrice: string;
  stores: ProductData[];
}

// This is mock data - in a real app, this would come from an API
const mockSearch = (query: string): Promise<GroupedProduct[]> => {
  // Just for demo, let's say we have results for "iphone" and "macbook"
  const iphoneResults: GroupedProduct = {
    id: "iphone15",
    title: "Apple iPhone 15 (128 GB) - Black",
    image: "/lovable-uploads/4f458e42-099d-428f-8054-c54ebd3e07e8.png",
    lowestPrice: "₹60,900",
    stores: [
      {
        id: "amz-iphone1",
        title: "Apple iPhone 15 (128 GB) - Black",
        image: "/lovable-uploads/4f458e42-099d-428f-8054-c54ebd3e07e8.png",
        store: "Amazon",
        price: "₹76,990",
        originalPrice: "₹79,900",
        discount: "4%",
        rating: "4.5",
        url: "https://amazon.com/iphone15",
        isBestPrice: false
      },
      {
        id: "flip-iphone1",
        title: "iPhone 15 (128GB) Black",
        image: "/lovable-uploads/4f458e42-099d-428f-8054-c54ebd3e07e8.png",
        store: "Flipkart",
        price: "₹60,900",
        originalPrice: "₹79,900",
        discount: "24%",
        rating: "4.6",
        url: "https://flipkart.com/iphone15",
        isBestPrice: true
      },
      {
        id: "rel-iphone1",
        title: "Apple iPhone 15 Black 128GB",
        image: "/lovable-uploads/4f458e42-099d-428f-8054-c54ebd3e07e8.png",
        store: "Reliance Digital",
        price: "₹72,900",
        originalPrice: "₹79,900",
        discount: "9%",
        rating: "4.3",
        url: "https://reliancedigital.in/iphone15",
        isBestPrice: false
      }
    ]
  };

  const macbookResults: GroupedProduct = {
    id: "macbook-air",
    title: "Apple MacBook Air Laptop with M2 chip with 8 GB RAM / 512 GB SSD",
    image: "https://m.media-amazon.com/images/I/71LAlGbpGOL._SL1500_.jpg",
    lowestPrice: "₹78,990",
    stores: [
      {
        id: "amz-macbook1",
        title: "Apple MacBook Air M2 (2023)",
        image: "https://m.media-amazon.com/images/I/71LAlGbpGOL._SL1500_.jpg",
        store: "Amazon",
        price: "₹78,990",
        originalPrice: "₹1,49,900",
        discount: "47%",
        rating: "4.7",
        url: "https://amazon.com/macbook-air-m2",
        isBestPrice: true
      },
      {
        id: "flip-macbook1",
        title: "Apple MacBook Air M2",
        image: "https://m.media-amazon.com/images/I/71LAlGbpGOL._SL1500_.jpg",
        store: "Flipkart",
        price: "₹82,990",
        originalPrice: "₹1,49,900",
        discount: "45%",
        rating: "4.6",
        url: "https://flipkart.com/macbook-air-m2",
        isBestPrice: false
      }
    ]
  };

  const washingMachineResults: GroupedProduct = {
    id: "samsung-washing-machine",
    title: "SAMSUNG 8.5 kg 5 star Semi Automatic Top Load Washing Machine",
    image: "/lovable-uploads/108fe49d-0ebf-49d4-8555-7624c47c5f4f.png",
    lowestPrice: "₹13,490",
    stores: [
      {
        id: "amz-washing1",
        title: "SAMSUNG 8.5 kg Washing Machine",
        image: "/lovable-uploads/108fe49d-0ebf-49d4-8555-7624c47c5f4f.png",
        store: "Amazon",
        price: "₹13,490",
        originalPrice: "₹18,500",
        discount: "27%",
        rating: "4.3",
        url: "https://amazon.com/samsung-washing-machine",
        isBestPrice: true
      },
      {
        id: "flip-washing1",
        title: "Samsung 8.5 kg Semi Automatic",
        image: "/lovable-uploads/108fe49d-0ebf-49d4-8555-7624c47c5f4f.png",
        store: "Flipkart",
        price: "₹13,990",
        originalPrice: "₹18,500",
        discount: "24%",
        rating: "4.4",
        url: "https://flipkart.com/samsung-washing-machine",
        isBestPrice: false
      }
    ]
  };

  const headphonesResults: GroupedProduct = {
    id: "sony-headphones",
    title: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
    image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_UF1000,1000_QL80_.jpg",
    lowestPrice: "₹19,740",
    stores: [
      {
        id: "amz-headphones1",
        title: "Sony WH-1000XM4",
        image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_UF1000,1000_QL80_.jpg",
        store: "Amazon",
        price: "₹19,740",
        originalPrice: "₹29,990",
        discount: "34%",
        rating: "4.7",
        url: "https://amazon.com/sony-wh1000xm4",
        isBestPrice: true
      },
      {
        id: "flip-headphones1",
        title: "Sony WH-1000XM4 Wireless",
        image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_UF1000,1000_QL80_.jpg",
        store: "Flipkart",
        price: "₹22,990",
        originalPrice: "₹29,990",
        discount: "23%",
        rating: "4.5",
        url: "https://flipkart.com/sony-wh1000xm4",
        isBestPrice: false
      }
    ]
  };

  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let results: GroupedProduct[] = [];
      
      if (lowerQuery.includes("iphone")) {
        results.push(iphoneResults);
      }
      if (lowerQuery.includes("macbook") || lowerQuery.includes("laptop")) {
        results.push(macbookResults);
      }
      if (lowerQuery.includes("washing") || lowerQuery.includes("samsung")) {
        results.push(washingMachineResults);
      }
      if (lowerQuery.includes("sony") || lowerQuery.includes("headphone")) {
        results.push(headphonesResults);
      }

      // If no specific matches, return some default results
      if (results.length === 0) {
        results = [iphoneResults, macbookResults, washingMachineResults, headphonesResults];
      }

      resolve(results);
    }, 500);
  });
};

const ProductResult = ({ product }: { product: GroupedProduct }) => {
  return (
    <Card className="bg-white rounded-3xl overflow-hidden mb-8">
      <div className="p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-48 object-contain"
          />
        </div>
        <div className="md:w-3/4">
          <Link to={`/product/${product.id}`}>
            <h2 className="text-xl font-bold mb-2 hover:text-blue-600">{product.title}</h2>
          </Link>
          <div className="flex items-center mb-4">
            <p className="text-lg font-semibold text-green-600">Best Price: {product.lowestPrice}</p>
            <Badge className="ml-2 bg-green-600">BEST DEAL</Badge>
          </div>
          
          <div className="space-y-3">
            {product.stores.map((store) => (
              <div key={store.id} className="flex flex-wrap items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <div className="font-medium">{store.store}</div>
                  {store.isBestPrice && (
                    <Badge className="bg-green-600 text-xs">Best Price</Badge>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <span className="font-bold">{store.price}</span>
                    {store.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">{store.originalPrice}</span>
                    )}
                    {store.discount && (
                      <span className="ml-2 text-xs text-green-600">-{store.discount}</span>
                    )}
                  </div>
                  <Button 
                    asChild 
                    variant="outline"
                    className="h-8"
                  >
                    <a href={store.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      <span className="ml-1">Visit</span>
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-between">
            <Button 
              asChild
              variant="default" 
              className="bg-black text-white hover:bg-gray-800"
            >
              <Link to={`/product/${product.id}`}>
                Compare All Prices
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="border-2 hover:bg-gray-100">
                <Heart className="h-4 w-4" />
                <span className="ml-1">Save</span>
              </Button>
              <Button variant="outline" className="border-2 hover:bg-gray-100">
                <Share2 className="h-4 w-4" />
                <span className="ml-1">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<GroupedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await mockSearch(query);
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-amber-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="my-8">
          <Link 
            to="/"
            className="inline-flex items-center text-black hover:underline mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold mb-6">Search Results for "{query}"</h1>
          
          <div className="mb-8">
            <SearchBar />
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="text-xl font-medium">Loading results...</div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <p className="mb-6 text-lg">{results.length} products found</p>
              {results.map((product) => (
                <ProductResult key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">No products found for "{query}"</h2>
              <p className="text-lg mb-6">Try adjusting your search term or browse our deals.</p>
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <Link to="/deals">Browse Deals</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
