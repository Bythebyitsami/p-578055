
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut, Settings } from "lucide-react";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleProductClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      // Navigate to product details when implemented
      navigate("/deals");
    }
  };

  return (
    <header className={cn("w-full", className)}>
      <div className="flex justify-between items-center px-0 py-5 max-sm:flex-col max-sm:gap-5">
        <div className="text-4xl text-black leading-[1.2] font-bold">
          <Link to="/">
            <span>PRICE</span>
            <br />
            <span>PANDA</span>
          </Link>
        </div>

        <nav
          className="flex gap-[65px] mx-10 my-0 max-md:gap-[30px] max-sm:flex-wrap max-sm:justify-center max-sm:gap-5 max-sm:hidden"
          aria-label="Main navigation"
        >
          <Link
            to="/about"
            className="text-xl text-black hover:text-primary transition-colors px-2 py-1 rounded"
          >
            About
          </Link>
          <Link
            to="/"
            className="text-xl text-black hover:text-primary transition-colors px-2 py-1 rounded"
          >
            Home
          </Link>
          <Button
            variant="link"
            className="text-xl text-black hover:text-primary transition-colors p-0 h-auto"
            onClick={handleProductClick}
          >
            Deals
          </Button>
          <Link
            to="/contact"
            className="text-xl text-black hover:text-primary transition-colors px-2 py-1 rounded"
          >
            Contact
          </Link>
          <Button
            variant="link"
            className="text-xl text-black hover:text-primary transition-colors p-0 h-auto"
            onClick={() => {
              if (!isLoggedIn) {
                navigate("/login");
              } else {
                // Navigate to wishlist page when implemented
                navigate("/wishlist");
              }
            }}
          >
            Wishlist
          </Button>
        </nav>

        <div className="flex items-center gap-[23px] max-sm:w-full max-sm:justify-between">
          <button
            aria-label="Notifications"
            className="hover:bg-[#F7F3E7] p-2 rounded transition-colors"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/019a0b99d1c944faa84618497a8fb43e2aad69b5"
              alt="Notification bell"
              className="w-5 h-5"
            />
          </button>
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-xl text-black hover:text-primary transition-colors px-2 py-1 rounded">
                  {user?.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt="Profile" 
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center text-sm text-gray-700">
                      {user?.firstName.charAt(0)}
                    </div>
                  )}
                  {user?.firstName || "Profile"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg z-50">
                <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="text-xl text-black hover:text-primary transition-colors px-2 py-1 rounded">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Login</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
