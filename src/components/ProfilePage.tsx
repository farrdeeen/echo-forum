import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Edit, MessageCircle } from "lucide-react";
import { PostCard } from "./PostCard";
import { mockPosts } from "@/data/mockData";

interface User {
  name: string;
  title: string;
  bio: string;
  email: string;
  avatar?: string;
  posts?: string[];
}

interface ProfilePageProps {
  user: User;
  isOwnProfile?: boolean;
  onConnect?: () => void;
  onMessage?: () => void;
}

export const ProfilePage = ({ user, isOwnProfile = false, onConnect, onMessage }: ProfilePageProps) => {
  const userPosts = user.posts ? mockPosts.filter(post => user.posts?.includes(post.id)) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <Card className="gradient-card shadow-card border-card-border mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {!isOwnProfile && (
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
                  <h1 className="text-2xl font-bold text-card-foreground mb-1">{user.name}</h1>
                  <p className="text-lg text-muted-foreground mb-2">{user.title}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                </div>
                
                {isOwnProfile && (
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>

              <p className="text-card-foreground leading-relaxed mb-4">{user.bio}</p>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Product Management</Badge>
                <Badge variant="secondary">User Experience</Badge>
                <Badge variant="secondary">Data Analysis</Badge>
                <Badge variant="secondary">Team Leadership</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="gradient-card shadow-card border-card-border">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">500+</div>
            <div className="text-sm text-muted-foreground">Connections</div>
          </div>
        </Card>
        <Card className="gradient-card shadow-card border-card-border">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{userPosts.length}</div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </div>
        </Card>
        <Card className="gradient-card shadow-card border-card-border">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">1.2K</div>
            <div className="text-sm text-muted-foreground">Post Views</div>
          </div>
        </Card>
      </div>

      {/* Posts Section */}
      <div>
        <h2 className="text-xl font-semibold text-card-foreground mb-4">
          {isOwnProfile ? "Your Posts" : `Posts by ${user.name.split(' ')[0]}`}
        </h2>
        
        <div className="space-y-4">
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={(postId) => console.log("Like post:", postId)}
                onComment={(postId) => console.log("Comment on post:", postId)}
                onShare={(postId) => console.log("Share post:", postId)}
              />
            ))
          ) : (
            <Card className="gradient-card shadow-card border-card-border">
              <div className="p-8 text-center">
                <p className="text-muted-foreground">
                  {isOwnProfile ? "You haven't posted anything yet." : "No posts to show."}
                </p>
                {isOwnProfile && (
                  <Button className="mt-4 gradient-primary">
                    Create Your First Post
                  </Button>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};