import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("w-full", className)}>
      <div className="flex justify-between items-center px-0 py-5 max-sm:flex-col max-sm:gap-5">
        <div className="text-4xl text-black leading-[1.2] font-bold">
          <span>PRICE</span>
          <br />
          <span>PANDA</span>
        </div>

        <nav
          className="flex gap-[65px] mx-10 my-0 max-md:gap-[30px] max-sm:flex-wrap max-sm:justify-center max-sm:gap-5 max-sm:hidden"
          aria-label="Main navigation"
        >
          <a
            href="#about"
            className="text-xl text-black hover:text-primary transition-colors"
          >
            About
          </a>
          <a
            href="#home"
            className="text-xl text-black hover:text-primary transition-colors"
          >
            Home
          </a>
          <a
            href="#deals"
            className="text-xl text-black hover:text-primary transition-colors"
          >
            Deals
          </a>
          <a
            href="#contact"
            className="text-xl text-black hover:text-primary transition-colors"
          >
            Contact
          </a>
          <a
            href="#wishlist"
            className="text-xl text-black hover:text-primary transition-colors"
          >
            Wishlist
          </a>
        </nav>

        <div className="flex items-center gap-[23px] max-sm:w-full max-sm:justify-between">
          <button
            aria-label="Notifications"
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/019a0b99d1c944faa84618497a8fb43e2aad69b5"
              alt="Notification bell"
              className="w-5 h-5"
            />
          </button>
          <button className="text-xl text-black hover:text-primary transition-colors">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
