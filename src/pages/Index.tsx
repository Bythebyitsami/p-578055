
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { TopDeals } from "@/components/home/TopDeals";
import { Reviews } from "@/components/home/Reviews";

const Index = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Raleway:wght@400;500&family=Trocchi&family=Montserrat:wght@700&display=swap"
        rel="stylesheet"
      />
      <main className="min-h-screen mx-auto">
        <div className="px-10 py-5 max-md:max-w-[991px] max-sm:max-w-screen-sm bg-gradient-to-b from-yellow-300 via-amber-200 to-yellow-100">
          <Header />
          <Hero />
        </div>
        <TopDeals />
        <Reviews />
      </main>
    </>
  );
};

export default Index;
