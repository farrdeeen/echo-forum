import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 bg-blue-600 text-white border-b border-blue-700 shadow">
      <Link to="/" className="text-lg font-bold text-white hover:text-blue-100 transition">
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
                  className="w-7 h-7 rounded-full object-cover border-2 border-blue-200"
                />
              )}
              <span className="text-sm">{user.name || user.email}</span>
            </div>
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="border border-white/40 hover:bg-blue-700 text-white"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link to="/auth">
            <Button
              size="sm"
              variant="ghost"
              className="border border-white/40 hover:bg-blue-700 text-white"
            >
              Login
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
