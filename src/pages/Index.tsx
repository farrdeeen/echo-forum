import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

import { Navigation } from "@/components/Navigation";
import AuthPage from "@/components/AuthPage";
import { PostCard } from "@/components/PostCard";
import CreatePost from "@/components/CreatePost";
import { ProfilePage } from "@/components/ProfilePage";
import { useAuth } from "@/lib/auth";

/* ───────── Types ───────── */
interface User {
  _id: string;
  name: string;
  avatar_url?: string | null;
}
interface Post {
  _id: string;
  content: string;
  created_at: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  author: {
    name: string;
    title?: string;
    avatar_url?: string | null;
  };
}

/* ────── API Helper ────── */
const fetchPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts/");
  return response.data;
};

/* ───── useFetch Hook ───── */
function useFetch<T>(fn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const run = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fn();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [fn]);

  useEffect(() => {
    run();
  }, [run]);

  return { data, loading, error, refetch: run };
}

/* ────────── Component ────────── */
const Index = () => {
  const { user } = useAuth();
  const [page, setPage] = useState("feed");
  const [authType, setAuthType] = useState<"login" | "register">("login");

  const {
    data: posts = [],
    loading: postsLoading,
    refetch: refetchPosts,
  } = useFetch<Post[]>(fetchPosts);

  const changePage = (p: string) => {
    if (p === "login" || p === "register") setAuthType(p as "login" | "register");
    setPage(p);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation currentPage={page} onPageChange={changePage} />
        <AuthPage
          type={authType}
          onAuth={() => setPage("feed")}
          onToggle={() => setAuthType(authType === "login" ? "register" : "login")}
        />
      </div>
    );
  }

  let content: JSX.Element;
  switch (page) {
    case "profile":
      content = <ProfilePage userId={user._id} />;
      break;
    case "create":
      content = (
        <div className="max-w-2xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-6">Create a Post</h1>
          <CreatePost
            currentUser={{ name: user.name, avatar: user.avatar_url || "" }}
            onSuccess={refetchPosts}
          />
        </div>
      );
      break;
    case "notifications":
      content = (
        <section className="max-w-2xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-6">Notifications</h1>
          <p className="text-center text-muted-foreground py-12">
            No new notifications
          </p>
        </section>
      );
      break;
    case "messages":
      content = (
        <section className="max-w-2xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-6">Messages</h1>
          <p className="text-center text-muted-foreground py-12">
            No messages yet
          </p>
        </section>
      );
      break;
    default:
      content = (
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="mb-6">
            <CreatePost
              currentUser={{ name: user.name, avatar: user.avatar_url || "" }}
              onSuccess={refetchPosts}
            />
          </div>
          {postsLoading ? (
            <p className="text-center py-12 text-muted-foreground">Loading…</p>
          ) : (
            <div className="space-y-4">
              {posts.map((p) => (
                <PostCard
                  key={p._id}
                  post={{
                    ...p,
                    author: {
                      ...p.author,
                      title: p.author.title ?? "Member", // fallback for PostCard
                    },
                  }}
                  onComment={() => console.log("comment", p._id)}
                  onShare={() => console.log("share", p._id)}
                />
              ))}
            </div>
          )}
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={page} onPageChange={changePage} />
      {content}
    </div>
  );
};

export default Index;
