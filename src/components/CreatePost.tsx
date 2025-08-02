import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, Video, Calendar, MoreHorizontal } from "lucide-react";

interface CreatePostProps {
  currentUser: {
    name: string;
    avatar?: string;
  };
  onCreatePost: (content: string) => void;
}

export const CreatePost = ({ currentUser, onCreatePost }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onCreatePost(content.trim());
      setContent("");
      setIsExpanded(false);
    }
  };

  return (
    <Card className="gradient-card shadow-card border-card-border">
      <div className="p-6">
        <div className="flex space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <Textarea
              placeholder="Share your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="min-h-[60px] resize-none border-none shadow-none focus-visible:ring-0 text-base"
              rows={isExpanded ? 4 : 2}
            />
            
            {isExpanded && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Image className="w-4 h-4 mr-2" />
                    Photo
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Video className="w-4 h-4 mr-2" />
                    Video
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    Event
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setIsExpanded(false);
                      setContent("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!content.trim()}
                    className="gradient-primary"
                  >
                    Post
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};