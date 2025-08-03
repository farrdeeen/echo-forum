import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Mail, Edit, MessageCircle } from "lucide-react";
import { PostCard } from "@/components/PostCard";
import { getTyped } from "@/lib/request";
import { useFetch } from "@/hooks/useFetch";
import { useAuth } from "@/lib/auth";

/* ---------- domain types ---------- */
interface User {
  _id: string;
  name: string;
  email: string;
  title?: string;
  bio?: string;
  avatar_url?: string | null;
}
interface Post {
  _id: string;
  content: string;
  created_at: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  author?: { name?: string; title?: string; avatar_url?: string | null };
}

interface ProfilePageProps {
  userId: string | undefined;
  onConnect?: () => void;
  onMessage?: () => void;
}

export const ProfilePage = ({
  userId,
  onConnect,
  onMessage,
}: ProfilePageProps) => {
  // Defensive guard: do not proceed with invalid userId
  if (!userId) {
    return <div className="p-8">Invalid or missing user ID.</div>;
  }

  const { user: me } = useAuth();
  const isOwn = me?._id === userId;

  /* fetch profile */
  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
  } = useFetch<User>(() => getTyped(`/users/${userId}`));

  /* fetch posts */
  const {
    data: posts = [],
    loading: postsLoading,
    error: postsError,
  } = useFetch<Post[]>(() => getTyped(`/users/${userId}/posts/`));

  if (profileLoading || postsLoading) return <p className="p-8">Loading…</p>;
  if (profileError || postsError) return <p className="p-8">Error loading data.</p>;
  if (!profile) return <p className="p-8">Profile not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* profile header */}
      <Card className="gradient-card shadow-card border-card-border mb-6">
        <div className="p-6 flex flex-col md:flex-row md:space-x-6">
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src={profile.avatar_url ?? undefined} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {profile.name
                  ? profile.name.split(" ").map(n => n[0]).join("") 
                  : "?"}
              </AvatarFallback>
            </Avatar>

            {!isOwn && (
              <div className="flex space-x-2">
                <Button onClick={onConnect} className="gradient-primary">
                  Connect
                </Button>
                <Button variant="outline" onClick={onMessage}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            )}
          </div>

          <div className="flex-1 mt-4 md:mt-0">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">{profile.name || "Unknown User"}</h1>
                <p className="text-lg text-muted-foreground mb-2">
                  {profile.title || "Member"}
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>{profile.email || "No email"}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span> {/* TODO: dynamic */}
                  </span>
                </div>
              </div>

              {isOwn && (
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>

            <p className="leading-relaxed mb-4">{profile.bio || "No bio provided."}</p>

            {/* Hard-coded badges for now */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Product Management</Badge>
              <Badge variant="secondary">User Experience</Badge>
              <Badge variant="secondary">Data Analysis</Badge>
              <Badge variant="secondary">Team Leadership</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="gradient-card shadow-card border-card-border">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">500+</div>
            <div className="text-sm text-muted-foreground">Connections</div>
          </div>
        </Card>
        <Card className="gradient-card shadow-card border-card-border">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {posts.length}
            </div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </div>
        </Card>
        <Card className="gradient-card shadow-card border-card-border">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">1.2 K</div>
            <div className="text-sm text-muted-foreground">Post Views</div>
          </div>
        </Card>
      </div>

      {/* posts */}
      <h2 className="text-xl font-semibold mb-4">
        {isOwn ? "Your Posts" : `Posts by ${profile.name?.split(" ")[0] || "User"}`}
      </h2>

      <div className="space-y-4">
        {posts.length ? (
          posts.map(p => (
            <PostCard
              key={p._id}
              post={{
                ...p,
                author: {
                  name: p.author?.name || "Unknown",
                  title: p.author?.title || "Member",
                  avatar_url: p.author?.avatar_url ?? null,
                },
              }}
              onComment={() => console.log("comment", p._id)}
              onShare={() => console.log("share", p._id)}
            />
          ))
        ) : (
          <Card className="gradient-card shadow-card border-card-border">
            <div className="p-8 text-center">
              <p className="text-muted-foreground">
                {isOwn
                  ? "You haven’t posted anything yet."
                  : "No posts to show."}
              </p>
              {isOwn && (
                <Button className="mt-4 gradient-primary">
                  Create Your First Post
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
