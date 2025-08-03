import * as React from "react";
import { Heart, MessageSquare, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Author {
  name: string;
  title: string;
  avatar_url?: string | null;
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
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onComment,
  onShare,
}) => {
  const [liked, setLiked] = React.useState(post.isLiked ?? false);
  const [likeCount, setLikeCount] = React.useState(post.likes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => prev + (liked ? -1 : 1));
    // You can call your backend like endpoint here if needed
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center gap-3">
          <Avatar>
            {post.author.avatar_url ? (
              <AvatarImage src={post.author.avatar_url} />
            ) : (
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            )}
          </Avatar>
          <div className="text-sm leading-tight">
            <p className="font-medium">{post.author.name}</p>
            <p className="text-muted-foreground text-xs">
              {post.created_at.slice(0, 10)} {/* ISO → YYYY-MM-DD */}
            </p>
          </div>
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
              className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
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
