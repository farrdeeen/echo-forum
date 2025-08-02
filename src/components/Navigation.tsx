import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, User, PlusSquare, Bell, MessageCircle } from "lucide-react";

interface NavigationProps {
  currentUser?: {
    name: string;
    avatar?: string;
  };
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Navigation = ({ currentUser, currentPage, onPageChange }: NavigationProps) => {
  const navItems = [
    { id: "feed", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "create", label: "Post", icon: PlusSquare },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "messages", label: "Messages", icon: MessageCircle },
  ];

  if (!currentUser) {
    return (
      <nav className="border-b bg-card shadow-card">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded"></div>
              <span className="text-xl font-bold text-primary">ProConnect</span>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                onClick={() => onPageChange("login")}
                className={currentPage === "login" ? "bg-secondary" : ""}
              >
                Sign In
              </Button>
              <Button 
                onClick={() => onPageChange("register")}
                className={currentPage === "register" ? "bg-primary-dark" : ""}
              >
                Join Now
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b bg-card shadow-card sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded"></div>
              <span className="text-xl font-bold text-primary">ProConnect</span>
            </div>
            
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => onPageChange(item.id)}
                    className={`flex flex-col items-center px-3 py-2 h-auto ${
                      currentPage === item.id ? "text-primary bg-secondary" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs mt-1">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:block text-sm font-medium">{currentUser.name}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};