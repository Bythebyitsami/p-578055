
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Search for products (e.g., iPhone 15, Samsung TV)..."
          className="w-full py-6 pl-5 pr-16 text-lg rounded-full bg-white border-2 border-black focus-visible:ring-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button 
          type="submit"
          className="absolute right-2 rounded-full bg-black hover:bg-gray-800 p-2"
          disabled={!searchQuery.trim()}
        >
          <Search className="h-6 w-6" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </form>
  );
}
