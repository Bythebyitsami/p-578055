
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { TopDeals } from "@/components/home/TopDeals";

const Index = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Raleway:wght@400;500&family=Trocchi&family=Montserrat:wght@700&display=swap"
        rel="stylesheet"
      />
      <main className="min-h-screen mx-auto">
        <div className="px-10 py-5 max-md:max-w-[991px] max-sm:max-w-screen-sm">
          <Header />
          <Hero />
        </div>
        <TopDeals />
      </main>
    </>
  );
};

export default Index;
