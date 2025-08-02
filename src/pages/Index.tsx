import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { AuthPage } from "@/components/AuthPage";
import { PostCard } from "@/components/PostCard";
import { CreatePost } from "@/components/CreatePost";
import { ProfilePage } from "@/components/ProfilePage";
import { mockPosts, mockUsers } from "@/data/mockData";

interface User {
  name: string;
  title: string;
  bio: string;
  email: string;
  avatar?: string;
  posts?: string[];
}

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState("feed");
  const [authType, setAuthType] = useState<"login" | "register">("login");
  const [posts, setPosts] = useState(mockPosts);

  // Handle authentication
  const handleAuth = (userData: User) => {
    setCurrentUser(userData);
    setCurrentPage("feed");
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("login");
  };

  // Handle page navigation
  const handlePageChange = (page: string) => {
    if (page === "login" || page === "register") {
      setAuthType(page as "login" | "register");
      setCurrentPage(page);
    } else {
      setCurrentPage(page);
    }
  };

  // Handle creating new posts
  const handleCreatePost = (content: string) => {
    if (!currentUser) return;
    
    const newPost = {
      id: Date.now().toString(),
      author: {
        name: currentUser.name,
        title: currentUser.title,
        avatar: currentUser.avatar
      },
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      isLiked: false
    };
    
    setPosts(prev => [newPost, ...prev]);
    setCurrentPage("feed");
  };

  // Handle post interactions
  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  // If not authenticated, show auth page
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation 
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <AuthPage 
          type={authType}
          onAuth={handleAuth}
          onToggle={() => setAuthType(authType === "login" ? "register" : "login")}
        />
      </div>
    );
  }

  // Render different pages based on current page
  const renderContent = () => {
    switch (currentPage) {
      case "profile":
        return (
          <ProfilePage 
            user={currentUser}
            isOwnProfile={true}
          />
        );
        
      case "create":
        return (
          <div className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-foreground mb-6">Create a Post</h1>
            <CreatePost 
              currentUser={currentUser}
              onCreatePost={handleCreatePost}
            />
          </div>
        );
        
      case "notifications":
        return (
          <div className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-foreground mb-6">Notifications</h1>
            <div className="text-center text-muted-foreground py-12">
              <p>No new notifications</p>
            </div>
          </div>
        );
        
      case "messages":
        return (
          <div className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-foreground mb-6">Messages</h1>
            <div className="text-center text-muted-foreground py-12">
              <p>No messages yet</p>
            </div>
          </div>
        );
        
      default: // feed
        return (
          <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="mb-6">
              <CreatePost 
                currentUser={currentUser}
                onCreatePost={handleCreatePost}
              />
            </div>
            
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onComment={(postId) => console.log("Comment on:", postId)}
                  onShare={(postId) => console.log("Share:", postId)}
                />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentUser={currentUser}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {renderContent()}
    </div>
  );
};

export default Index;