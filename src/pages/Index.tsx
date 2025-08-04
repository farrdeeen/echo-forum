import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";
import { Navigation } from "@/components/Navigation";
import AuthPage from "@/components/AuthPage";
import { PostCard } from "@/components/PostCard";
import CreatePost from "@/components/CreatePost";
import { ProfilePage } from "@/components/ProfilePage";
import { useAuth } from "@/lib/auth";

interface User {
  _id: string;
  name: string;
  avatar_url?: string | null;
}
interface Author {
  name: string;
  _id?: string;
  title?: string;
  avatar_url?: string | null;
}
interface Post {
  _id: string;
  content: string;
  created_at: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  author?: Author;
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts/");
  return response.data;
};

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
    // Debug: show that our useFetch run is executing
    console.log("useFetch: Running fetch for", fn.name || "<anonymous>");
  }, [run]);

  return { data, loading, error, refetch: run };
}

const Index = () => {
  const { user, loading } = useAuth();
  const [page, setPage] = useState("feed");
  const [authType, setAuthType] = useState<"login" | "register">("login");
  // NEW: Track the current "selected" profile userId (default to your own)
  const [profileUserId, setProfileUserId] = useState<string | null>(null);

  const {
    data: posts = [],
    loading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = useFetch<Post[]>(fetchPosts);

  // Debug logs for main states
  console.log("[Index] user:", user, "| loading:", loading, "| page:", page);

  // When navigating to the profile, set the profileUserId
  const changePage = (p: string, id?: string) => {
    console.log("[Index] changePage called with:", p, id);
    if (p === "login" || p === "register") setAuthType(p as "login" | "register");
    if (p === "profile" && id) {
      setProfileUserId(id);
    }
    setPage(p);
  };

  if (loading) {
    console.log("[Index] Still authenticating user...");
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading user…</p>
      </div>
    );
  }

  if (!user) {
    console.log("[Index] No user loaded; showing AuthPage. authType:", authType);
    return (
      <div className="min-h-screen bg-background">
        <Navigation currentPage={page} onPageChange={changePage} />
        <AuthPage
          type={authType}
          onAuth={() => {
            console.log("[Index] onAuth fired (login/register succeeded)");
            setPage("feed");
          }}
          onToggle={() => setAuthType(authType === "login" ? "register" : "login")}
        />
      </div>
    );
  }

  let content: JSX.Element;
  switch (page) {
    case "profile":
      // Always use profileUserId for ProfilePage (your own if none selected yet)
      const showUserId = profileUserId || user._id;
      console.log("[Index] Rendering profile page for user._id:", showUserId);
      content =
        showUserId
          ? <ProfilePage userId={showUserId} />
          : <p className="p-8">Loading user…</p>;
      break;
    case "create":
      content = (
        <div className="max-w-2xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-6">Create a Post</h1>
          <CreatePost onSuccess={refetchPosts} />
        </div>
      );
      break;
    case "notifications":
      content = (
        <section className="max-w-2xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-6">Notifications</h1>
          <p className="text-center text-muted-foreground py-12">No new notifications</p>
        </section>
      );
      break;
    case "messages":
      content = (
        <section className="max-w-2xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-6">Messages</h1>
          <p className="text-center text-muted-foreground py-12">No messages yet</p>
        </section>
      );
      break;
    default:
      console.log("[Index] Rendering main feed; postsLoading:", postsLoading, "postsError:", postsError);
      content = (
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="mb-6">
            <CreatePost onSuccess={refetchPosts} />
          </div>
          {postsLoading ? (
            <p className="text-center py-12 text-muted-foreground">Loading…</p>
          ) : postsError ? (
            <p className="text-center text-red-500 py-12">
              Failed to load posts: {postsError.message}
            </p>
          ) : (
            <div className="space-y-4">
              {posts.map((p) => (
                <PostCard
                  key={p._id}
                  post={{
                    ...p,
                    author: {
                      ...p.author,
                      _id: (p.author as any)?._id || (p as any).author_id || "", // ensure author id!
                    },
                  }}
                  onComment={() => console.log("comment", p._id)}
                  onShare={() => console.log("share", p._id)}
                  onAuthorClick={() => {
                    // Go to profile page for this user's id
                    if (p.author && p.author._id) {
                      changePage("profile", p.author._id);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>
      );
  }

  // Log which content we are rendering:
  console.log("[Index] Rendering content for page:", page);

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={page} onPageChange={changePage} />
      {content}
    </div>
  );
};

export default Index;
