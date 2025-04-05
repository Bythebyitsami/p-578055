
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";

export function HeroWithSearch() {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center py-12 bg-amber-300">
      <div className="container px-4 mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Find the Best Deals Across the Web
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
          Compare prices from multiple stores and save money on your purchases
        </p>
        
        <div className="mb-12">
          <SearchBar />
        </div>
        
        <div className="flex gap-4 justify-center">
          <Link
            to="/deals"
            className="bg-black hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium"
          >
            Today's Deals
          </Link>
          <Link
            to="/about"
            className="bg-white hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-medium border-2 border-black"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
