
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { StarIcon } from "./StarIcon";

// Sample reviews data
const reviews = [
  {
    id: 1,
    name: "Sneha K",
    avatar: "S",
    avatarColor: "bg-purple-500",
    rating: 4,
    text: "Finally, a shopping sidekick that does the hard work for me! Price Panda makes online shopping fun, fast, and super convenient.",
  },
  {
    id: 2,
    name: "Neha Firoz",
    avatar: "N",
    avatarColor: "bg-pink-500",
    rating: 5,
    text: "This website takes all the hassle out of finding discounts. It's fast, reliable, and super easy to use.",
  },
  {
    id: 3,
    name: "Rahul Sharma",
    avatar: "R",
    avatarColor: "bg-blue-500",
    rating: 5,
    text: "I saved ₹5,000 on my new laptop thanks to Price Panda! The price comparison tool is a game-changer for serious shoppers.",
  },
  {
    id: 4,
    name: "Priya Mehta",
    avatar: "P",
    avatarColor: "bg-green-500",
    rating: 4,
    text: "Love how I can track price history over time. It helped me decide when to buy my new phone and saved me money!",
  },
  {
    id: 5,
    name: "Ankit Patel",
    avatar: "A",
    avatarColor: "bg-orange-500",
    rating: 5,
    text: "The browser extension automatically finds coupons at checkout - it's like having a money-saving assistant with me everywhere I shop.",
  },
];

export function Reviews() {
  return (
    <section className="py-16 bg-amber-300 relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12">Why Shoppers Love Price Panda</h2>
        
        <Carousel className="w-full" opts={{ loop: true, align: "center" }}>
          <CarouselContent>
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="md:basis-3/4 lg:basis-2/3 xl:basis-1/2 pl-4">
                <ReviewCard review={review} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-10 gap-8">
            <CarouselPrevious 
              className="relative position-static left-0 translate-y-0 h-12 w-12 rounded-full bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors"
            />
            <CarouselNext 
              className="relative position-static right-0 translate-y-0 h-12 w-12 rounded-full bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors"
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <Card className="bg-white rounded-3xl p-8 shadow-lg h-[280px] flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className={`${review.avatarColor} text-white w-10 h-10 rounded-full flex items-center justify-center font-medium`}>
          {review.avatar}
        </div>
        <span className="font-medium">{review.name}</span>
      </div>
      
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} filled={i < review.rating} />
        ))}
      </div>
      
      <p className="text-lg font-['Poppins'] leading-relaxed line-clamp-4 overflow-hidden">
        "{review.text}"
      </p>
    </Card>
  );
}
