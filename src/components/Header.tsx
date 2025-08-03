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
            <span className="text-sm text-muted-foreground">
              {user.name}
            </span>
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
