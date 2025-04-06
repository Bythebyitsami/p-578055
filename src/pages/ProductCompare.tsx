
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { ProductService, Product, ProductStore } from "@/services/ProductService";

const ProductCompare = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [stores, setStores] = useState<ProductStore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  // Sample features for demo purposes - in a real app these would come from the database
  const features = [
    "Processor: A16 Bionic chip (5-core CPU & GPU)",
    "Memory: 6 GB RAM",
    "Storage: 128 GB",
    "Display: 6.1-inch Super Retina XDR",
    "Camera: 48MP main with 2x telephoto",
    "Audio: Spatial Audio support",
    "Battery: Up to 15 hours video playback"
  ];

  useEffect(() => {
    // Redirect to login if not logged in
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchProductDetails = async () => {
      if (!productId) return;
      
      setIsLoading(true);
      try {
        const productData = await ProductService.getProductById(productId);
        if (productData) {
          setProduct(productData);
          
          const storesData = await ProductService.getProductStores(productId);
          setStores(storesData);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, isLoggedIn, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F2DA]">
        <div className="text-center">
          <div className="text-2xl font-bold">Loading product details...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F2DA]">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Product not found</div>
          <Button onClick={() => navigate("/deals")}>Back to Deals</Button>
        </div>
      </div>
    );
  }

  // Find the lowest price store
  const lowestPriceStore = stores.length > 0 
    ? stores.reduce((lowest, store) => store.store_price < lowest.store_price ? store : lowest, stores[0])
    : null;

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
              src={product.image_url} 
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
                  <p className="text-lg font-medium">
                    Lowest Price: 
                    <span className="text-green-600 font-bold"> 
                      ₹{lowestPriceStore ? lowestPriceStore.store_price.toLocaleString('en-IN') : product.price.toLocaleString('en-IN')}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">Available from {stores.length} stores</p>
                </div>
                <button className="p-2" aria-label="Add to wishlist">
                  <Heart className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            {lowestPriceStore && (
              <Button 
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 mb-4"
                asChild
              >
                <a href={lowestPriceStore.store_url} target="_blank" rel="noopener noreferrer">
                  View Best Deal at {lowestPriceStore.store_name}
                </a>
              </Button>
            )}
            
            <div className="flex gap-2 mb-8">
              {stores.slice(0, 2).map((store) => (
                <Button 
                  key={store.id}
                  variant="outline" 
                  className="flex-1 border border-gray-300 bg-[#f8f8f8] text-black hover:bg-gray-200"
                  asChild
                >
                  <a href={store.store_url} target="_blank" rel="noopener noreferrer">
                    {store.store_name}: ₹{store.store_price.toLocaleString('en-IN')}
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
                <TableHead className="text-black">Discount</TableHead>
                <TableHead className="text-black">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stores.map((store, index) => {
                // Calculate discount percentage if regular price is available
                const discountPercentage = product.discount_price
                  ? Math.round(((product.price - store.store_price) / product.price) * 100)
                  : null;
                
                return (
                  <TableRow key={store.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <TableCell>{store.store_name}</TableCell>
                    <TableCell>₹{store.store_price.toLocaleString('en-IN')}</TableCell>
                    <TableCell>{product.title.split(' ').slice(0, 3).join(' ')}</TableCell>
                    <TableCell>
                      {discountPercentage !== null ? `${discountPercentage}%` : '-'}
                    </TableCell>
                    <TableCell>
                      <a 
                        href={store.store_url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit {store.store_name}
                      </a>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
          <ul className="list-disc pl-6 space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="text-lg">{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductCompare;
