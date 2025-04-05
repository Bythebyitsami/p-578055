
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ProductCard } from "./ProductCard";

// Updated product data with correct images
const products = [
  {
    id: "1",
    title: "SAMSUNG 8.5 kg 5 star Semi Automatic Top Load Washing Machine",
    image: "/lovable-uploads/108fe49d-0ebf-49d4-8555-7624c47c5f4f.png",
    price: "₹13,490",
    rating: 4.4,
    stores: 3,
  },
  {
    id: "2",
    title: "Apple iPhone 15 (128 GB) - Black",
    image: "/lovable-uploads/4f458e42-099d-428f-8054-c54ebd3e07e8.png",
    price: "₹60,900",
    rating: 4.5,
    stores: 3,
  },
  {
    id: "3",
    title: "Sony WH-1000XM4",
    image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_UF1000,1000_QL80_.jpg",
    price: "₹19,740",
    rating: 4.5,
    stores: 3,
  },
  {
    id: "4",
    title: "Logitech MX Master 3S",
    image: "https://m.media-amazon.com/images/I/61ni3t1ryQL._SL1500_.jpg",
    price: "₹7,995",
    rating: 4.7,
    stores: 4,
  },
  {
    id: "5",
    title: "Apple MacBook Air Laptop with M2 chip with 8 GB RAM / 512 GB SSD",
    image: "https://m.media-amazon.com/images/I/71LAlGbpGOL._SL1500_.jpg",
    price: "₹52,990",
    rating: 4.3,
    stores: 5,
  },
];

export function TopDeals() {
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

        <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-4 md:basis-1/3 lg:basis-1/3">
                <ProductCard
                  id={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  rating={product.rating}
                  stores={product.stores}
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
      </div>
    </section>
  );
}
