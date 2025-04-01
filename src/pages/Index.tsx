import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";

const Index = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Raleway:wght@400;500&family=Trocchi&family=Montserrat:wght@700&display=swap"
        rel="stylesheet"
      />
      <main className="max-w-none min-h-screen mx-auto px-10 py-5 max-md:max-w-[991px] max-sm:max-w-screen-sm">
        <Header />
        <Hero />
      </main>
    </>
  );
};

export default Index;
