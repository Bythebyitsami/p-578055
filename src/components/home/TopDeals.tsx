
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ProductCard } from "./ProductCard";
import { ProductService, Product, ProductStore } from "@/services/ProductService";

interface ProductWithStores {
  product: Product;
  storeCount: number;
  lowestPrice: string;
}

export function TopDeals() {
  const [products, setProducts] = useState<ProductWithStores[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        
        // Get products
        const productList = await ProductService.getProducts({ limit: 5 });
        
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
    <section className="py-16 bg-amber-300">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-center mx-auto">
            <h2 className="text-4xl font-bold mb-4">Top Deals of the Day</h2>
            <p className="text-lg mb-2 max-w-3xl">
              Discover the hottest discounts on the best products of the day. Shop now and save big with unbeatable deals from your favorite e-commerce sites!
            </p>
          </div>
        </div>
        
        <div className="flex justify-end mb-8">
          <Link 
            to="/deals" 
            className="text-xl font-poppins hover:underline font-medium"
          >
            View all deals
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <div className="text-xl font-medium">Loading deals...</div>
          </div>
        ) : (
          <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
            <CarouselContent className="-ml-4">
              {products.map(({ product, storeCount, lowestPrice }) => (
                <CarouselItem key={product.id} className="pl-4 md:basis-1/3 lg:basis-1/3">
                  <ProductCard
                    product={product}
                    storeCount={storeCount}
                    lowestPrice={lowestPrice}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-8">
              <CarouselPrevious 
                className="relative position-static left-0 translate-y-0 h-12 w-12 rounded-full bg-white text-black hover:bg-black hover:text-white border-2 border-black"
              />
              <CarouselNext 
                className="relative position-static right-0 translate-y-0 h-12 w-12 rounded-full bg-white text-black hover:bg-black hover:text-white border-2 border-black"
              />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
}
