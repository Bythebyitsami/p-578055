
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";

interface ProductCardProps {
  title: string;
  image: string;
  price: string;
  rating: number;
  stores: number;
  className?: string;
}

export function ProductCard({
  title,
  image,
  price,
  rating,
  stores,
  className,
}: ProductCardProps) {
  return (
    <div className={cn("bg-white rounded-3xl p-5 flex flex-col h-full", className)}>
      <div className="relative mb-4 flex-1 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="max-h-52 object-contain"
        />
        <div className="absolute top-0 right-0 flex gap-2">
          <button
            className="hover:opacity-80 transition-opacity"
            aria-label="Add to favorites"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            className="hover:opacity-80 transition-opacity"
            aria-label="Share product"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium line-clamp-2">{title}</h3>
          <div className="bg-green-500 text-white px-2 py-1 rounded-md text-xs">
            {rating} ★
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="font-bold">From {price}</div>
          <div className="text-sm text-gray-600">{stores} stores</div>
        </div>

        <Button 
          variant="default" 
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          Compare Prices
        </Button>
      </div>
    </div>
  );
}
