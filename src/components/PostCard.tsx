import * as React from "react";
import { Heart, MessageSquare, Share2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import api from "@/lib/api";

interface Author {
  name: string;
  title?: string;
  avatar_url?: string | null;
  _id?: string;
}
export interface Post {
  _id: string;
  content: string;
  created_at: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  author: Author;
}
interface PostCardProps {
  post: Post;
  onComment: () => void;
  onShare: () => void;
  onDelete?: () => Promise<void>;
  onAuthorClick?: () => void; // NEW: navigation to author profile
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onComment,
  onShare,
  onDelete,
  onAuthorClick, // NEW
}) => {
  const [liked, setLiked] = React.useState(post.isLiked ?? false);
  const [likeCount, setLikeCount] = React.useState(post.likes);
  const [deleting, setDeleting] = React.useState(false);

  const toggleLike = async () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => prev + (liked ? -1 : 1));
    try {
      if (liked) {
        await api.delete(`/posts/${post._id}/like/`);
      } else {
        await api.post(`/posts/${post._id}/like/`);
      }
    } catch (err) {
      setLiked((prev) => !prev);
      setLikeCount((prev) => prev + (liked ? 1 : -1));
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    if (window.confirm("Delete this post? This cannot be undone.")) {
      setDeleting(true);
      await onDelete();
      setDeleting(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center gap-3">
          {/* ---- Clickable author/identity block ---- */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={onAuthorClick}
            tabIndex={0}
            role="button"
            aria-label={`View profile of ${post.author.name}`}
            style={{ outline: "none" }}
            onKeyDown={e => {
              if (onAuthorClick && (e.key === "Enter" || e.key === " ")) {
                onAuthorClick();
              }
            }}
          >
            <Avatar>
              {post.author.avatar_url ? (
                <AvatarImage src={post.author.avatar_url} />
              ) : (
                <AvatarFallback>
                  {post.author.name?.[0] || "?"}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="text-sm leading-tight">
              <p className="font-medium group-hover:underline">{post.author.name}</p>
              <p className="text-muted-foreground text-xs">
                {post.created_at.slice(0, 10)}
              </p>
            </div>
          </div>
          {/* -- Delete button always if passed -- */}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Delete post"
              title="Delete post"
              className="ml-auto text-red-600 hover:bg-red-100"
              onClick={handleDelete}
              disabled={deleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        <p className="text-sm text-foreground">{post.content}</p>

        <div className="flex gap-4 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLike}
            className="flex items-center gap-1 text-sm"
          >
            <Heart
              className={`h-4 w-4 ${
                liked ? "fill-red-500 text-red-500" : ""
              }`}
            />
            {likeCount}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onComment}
            className="flex items-center gap-1 text-sm"
          >
            <MessageSquare className="h-4 w-4" />
            {post.comments}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            className="flex items-center gap-1 text-sm"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
