
import { Header } from "@/components/layout/Header";
import { TopDeals } from "@/components/home/TopDeals";
import { Reviews } from "@/components/home/Reviews";
import { HeroWithSearch } from "@/components/home/HeroWithSearch";

const Index = () => {
  return (
    <div className="bg-amber-100">
      <Header />
      <HeroWithSearch />
      <TopDeals />
      <Reviews />
    </div>
  );
};

export default Index;
