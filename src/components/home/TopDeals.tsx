
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ProductCard } from "./ProductCard";

// Sample product data
const products = [
  {
    id: 1,
    title: "Sony WH-1000XM4",
    image: "/lovable-uploads/9178d7e9-f608-482b-acf2-bfa0d99b72d3.png",
    price: "₹19,740",
    rating: 4.5,
    stores: 3,
  },
  {
    id: 2,
    title: "SAMSUNG 8.5 kg 5 star Semi Automatic Top Load Washing Machine",
    image: "/lovable-uploads/9178d7e9-f608-482b-acf2-bfa0d99b72d3.png",
    price: "₹13,490",
    rating: 4.4,
    stores: 3,
  },
  {
    id: 3,
    title: "Apple iPhone 15 (128 GB) - Black",
    image: "/lovable-uploads/9178d7e9-f608-482b-acf2-bfa0d99b72d3.png",
    price: "₹60,900",
    rating: 4.5,
    stores: 3,
  },
  {
    id: 4,
    title: "Logitech MX Master 3S",
    image: "/lovable-uploads/9178d7e9-f608-482b-acf2-bfa0d99b72d3.png",
    price: "₹7,995",
    rating: 4.7,
    stores: 4,
  },
  {
    id: 5,
    title: "ASUS TUF Gaming F15 Gaming Laptop",
    image: "/lovable-uploads/9178d7e9-f608-482b-acf2-bfa0d99b72d3.png",
    price: "₹52,990",
    rating: 4.3,
    stores: 5,
  },
];

export function TopDeals() {
  return (
    <section className="py-16 bg-amber-300">
      <div className="container px-4 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Top Deals of the Day</h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          Discover the hottest discounts on the best products of the day. Shop now and save big with unbeatable deals from your favorite e-commerce sites!
        </p>

        <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-4 md:basis-1/3 lg:basis-1/3">
                <ProductCard
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
