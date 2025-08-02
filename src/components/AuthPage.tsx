import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface AuthPageProps {
  type: "login" | "register";
  onAuth: (userData: any) => void;
  onToggle: () => void;
}

export const AuthPage = ({ type, onAuth, onToggle }: AuthPageProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    bio: "",
    title: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "login") {
      // Mock login
      onAuth({
        name: "John Doe",
        email: formData.email,
        title: "Software Engineer",
        bio: "Passionate about technology and innovation",
        avatar: ""
      });
    } else {
      // Mock registration
      onAuth({
        name: formData.name,
        email: formData.email,
        title: formData.title,
        bio: formData.bio,
        avatar: ""
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded"></div>
            <span className="text-2xl font-bold text-primary">ProConnect</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {type === "login" ? "Welcome back" : "Join ProConnect"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {type === "login" 
              ? "Sign in to your professional network" 
              : "Build your professional network"}
          </p>
        </div>

        <Card className="gradient-card shadow-elevated border-card-border">
          <CardHeader>
            <CardTitle className="text-center">
              {type === "login" ? "Sign In" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {type === "login" 
                ? "Enter your credentials to access your account" 
                : "Fill in your information to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {type === "register" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Software Engineer, Marketing Manager"
                    />
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>

              {type === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio (Optional)</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                </div>
              )}

              <Button type="submit" className="w-full gradient-primary">
                {type === "login" ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {type === "login" ? "Don't have an account?" : "Already have an account?"}
                <Button
                  variant="link"
                  className="ml-1 p-0 h-auto text-primary"
                  onClick={onToggle}
                >
                  {type === "login" ? "Sign up" : "Sign in"}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};