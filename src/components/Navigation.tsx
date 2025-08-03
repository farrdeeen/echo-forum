import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  User,
  PlusSquare,
  Bell,
  MessageCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const { user, logout } = useAuth();

  const navItems = [
    { id: "feed", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "create", label: "Post", icon: PlusSquare },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "messages", label: "Messages", icon: MessageCircle },
  ];

  // ----------- PUBLIC NAV -----------
  if (!user) {
    return (
      <nav className="border-b bg-card shadow-card">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded" />
              <span className="text-xl font-bold text-primary">ProConnect</span>
            </div>
            {/* auth links */}
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

  // ----------- PRIVATE NAV -----------
  return (
    <nav className="border-b bg-card shadow-card sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* logo + nav buttons */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded" />
              <span className="text-xl font-bold text-primary">ProConnect</span>
            </div>
            <div className="hidden md:flex space-x-1">
              {navItems.map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant="ghost"
                  onClick={() => onPageChange(id)}
                  className={`flex flex-col items-center px-3 py-2 h-auto ${
                    currentPage === id
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs mt-1">{label}</span>
                </Button>
              ))}
            </div>
          </div>
          {/* user avatar + sign-out */}
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.avatar_url ?? undefined} />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {(user.name || "?")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:block text-sm font-medium">
              {user.name || "Anon"}
            </span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Sign out"
              onClick={() => {
                logout();
                onPageChange("login");
              }}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
