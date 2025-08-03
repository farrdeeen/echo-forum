import { useState } from "react";
import { useAuth } from "@/lib/auth";

interface AuthPageProps {
  type: "login" | "register";
  onAuth: () => void;
  onToggle: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ type, onAuth, onToggle }) => {
  const { login, register } = useAuth();

  // You don't need isRegistering; use `type` prop!
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (type === "register") {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      onAuth(); // notify parent
    } catch (err: any) {
      setError(err.response?.data?.detail || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-semibold mb-4">
        {type === "register" ? "Register" : "Login"}
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {type === "register" && (
          <input
            className="w-full px-4 py-2 border rounded"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          className="w-full px-4 py-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full px-4 py-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-opacity-90 transition"
        >
          {type === "register" ? "Register" : "Login"}
        </button>
      </form>
      <p className="mt-4 text-sm">
        {type === "register" ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          className="text-blue-500 underline"
          onClick={onToggle}
        >
          {type === "register" ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
