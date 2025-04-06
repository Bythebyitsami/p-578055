
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Share2, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ProductService, Product, ProductStore } from "@/services/ProductService";

interface ProductWithStores {
  product: Product;
  storeCount: number;
  lowestPrice: string;
}

const ProductCard = ({ productData }: { productData: ProductWithStores }) => {
  const { product, storeCount, lowestPrice } = productData;
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const handleCompareClick = () => {
    if (isLoggedIn) {
      navigate(`/product/${product.id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <Card className="bg-white rounded-3xl overflow-hidden h-full flex flex-col">
      <div className="p-4 flex-1 flex flex-col">
        <div 
          className="relative mb-4 flex items-center justify-center bg-white cursor-pointer"
          onClick={handleCompareClick}
        >
          <img
            src={product.image_url}
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
            <div className="font-bold">From {lowestPrice}</div>
            <div className="text-xs text-gray-600">{storeCount} stores</div>
          </div>

          <Button 
            className="w-full bg-black text-white hover:bg-gray-800"
            onClick={handleCompareClick}
          >
            Compare Prices
          </Button>
        </div>
      </div>
    </Card>
  );
};

const Deals = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductWithStores[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        
        // Get products
        const productList = await ProductService.getProducts({ limit: 20 });
        
        // Get store counts and lowest prices for each product
        const productsWithStores = await Promise.all(
          productList.map(async (product) => {
            const stores = await ProductService.getProductStores(product.id);
            const lowestPrice = stores.length > 0 
              ? `₹${Math.min(...stores.map(store => store.store_price)).toLocaleString('en-IN')}`
              : `₹${product.price.toLocaleString('en-IN')}`;
              
            return {
              product,
              storeCount: stores.length,
              lowestPrice
            };
          })
        );
        
        setProducts(productsWithStores);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
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
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">Today's Best Deals</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Save big with these special offers and discounts across multiple stores
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="text-xl font-medium">Loading products...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((productData) => (
                <ProductCard key={productData.product.id} productData={productData} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Deals;
