import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";

interface Post {
  id: string;
  author: {
    name: string;
    title: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export const PostCard = ({ post, onLike, onComment, onShare }: PostCardProps) => {
  const formatTime = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d`;
    return `${Math.floor(diffInHours / 168)}w`;
  };

  return (
    <Card className="gradient-card shadow-card hover:shadow-elevated transition-all duration-200 border-card-border">
      <div className="p-6">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {post.author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-card-foreground hover:text-primary cursor-pointer">
                {post.author.name}
              </h3>
              <p className="text-sm text-muted-foreground">{post.author.title}</p>
              <p className="text-xs text-muted-foreground">{formatTime(post.timestamp)}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-card-foreground leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {/* Engagement Stats */}
        {(post.likes > 0 || post.comments > 0) && (
          <div className="flex items-center justify-between mb-3 pt-3 border-t border-border">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              {post.likes > 0 && (
                <span className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <Heart className="w-2.5 h-2.5 text-white fill-white" />
                  </div>
                  <span>{post.likes}</span>
                </span>
              )}
              {post.comments > 0 && (
                <span>{post.comments} comments</span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike?.(post.id)}
            className={`flex items-center space-x-2 hover:bg-secondary ${
              post.isLiked ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Heart className={`w-4 h-4 ${post.isLiked ? "fill-primary" : ""}`} />
            <span>Like</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onComment?.(post.id)}
            className="flex items-center space-x-2 text-muted-foreground hover:bg-secondary"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Comment</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare?.(post.id)}
            className="flex items-center space-x-2 text-muted-foreground hover:bg-secondary"
          >
            <Share className="w-4 h-4" />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};