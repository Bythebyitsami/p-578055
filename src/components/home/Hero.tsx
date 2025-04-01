import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="flex items-center gap-10 mt-10 max-md:flex-col max-md:text-center">
      <div className="w-6/12 max-w-[881px] max-md:w-[70%] max-sm:w-[90%]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb776f79ce1fa780949291fd59ad6cf1d55503d4"
          alt="Panda mascot"
          className="w-full h-auto"
        />
      </div>

      <div className="flex-1 p-5 max-md:w-full">
        <h1 className="text-5xl font-bold text-black mb-[30px] max-sm:text-[28px]">
          YOUR SHOPPING SIDEKICK
        </h1>

        <p className="text-lg leading-[30px] text-black text-center max-w-screen-sm mb-10 max-sm:text-sm">
          Why waste time hopping between e-commerce sites when Price Panda can
          do the hard work for you? Compare prices effortlessly, find the best
          deals, and shop smarter—all in one place!
        </p>

        <Button
          className="text-lg font-bold text-black cursor-pointer transition-all duration-[0.3s] ease-[ease] 
                     bg-white px-10 py-4 rounded-[100px] border-4 border-solid border-black 
                     hover:bg-black hover:text-white max-sm:w-full"
          onClick={() => console.log("Get Started clicked")}
        >
          Get Started
        </Button>
      </div>
    </section>
  );
}
