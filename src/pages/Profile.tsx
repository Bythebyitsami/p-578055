
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const { user, isLoggedIn, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [firstName, setFirstName] = useState<string>(user?.user_metadata?.firstName || "");
  const [lastName, setLastName] = useState<string>(user?.user_metadata?.lastName || "");
  const [profileImage, setProfileImage] = useState<string | undefined>(user?.user_metadata?.profileImage);
  const [imageFile, setImageFile] = useState<File | null>(null);

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setProfileImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateProfile({
      firstName,
      lastName,
      profileImage
    });
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully"
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F2DA]">
      <div className="px-10 py-5 max-md:max-w-[991px] max-sm:max-w-screen-sm">
        <Header />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6 border-2 border-black hover:bg-black hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center">Profile Settings</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4 relative">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
                    {user?.user_metadata?.firstName?.charAt(0) || '?'}{user?.user_metadata?.lastName?.charAt(0) || '?'}
                  </div>
                )}
              </div>
              
              <label htmlFor="profile-image" className="cursor-pointer">
                <div className="flex items-center text-blue-600 hover:text-blue-800">
                  <Upload className="h-4 w-4 mr-1" />
                  <span>Upload image</span>
                </div>
                <input
                  id="profile-image"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            
            {/* Name fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            </div>
            
            {/* Email - read only */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <Input
                id="email"
                value={user?.email}
                className="w-full bg-gray-100"
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>
            
            {/* Submit button */}
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
