import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { TopDeals } from "@/components/home/TopDeals";
import { Reviews } from "@/components/home/Reviews";
import { useAuth } from "@/contexts/AuthContext";
const Index = () => {
  // Simply including useAuth here to ensure our context is available in this component
  const {
    isLoggedIn
  } = useAuth();
  return <>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Raleway:wght@400;500&family=Trocchi&family=Montserrat:wght@700&display=swap" rel="stylesheet" />
      <main className="min-h-screen mx-auto">
        <div className="px-10 py-5 max-md:max-w-[991px] max-sm:max-w-screen-sm bg-yellow-300">
          <Header />
          <Hero />
        </div>
        <TopDeals />
        <Reviews />
      </main>
    </>;
};
export default Index;