import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <Link to="/" className="text-lg font-bold">
        ThreadSpace
      </Link>
      <nav className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex items-center gap-2">
              {user.avatar_url && (
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
              <span className="text-sm text-muted-foreground">
                {user.name || user.email}
              </span>
            </div>
            <Button onClick={logout} variant="outline" size="sm">
              Logout
            </Button>
          </>
        ) : (
          <Link to="/auth">
            <Button size="sm">Login</Button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
