import { useState } from "react";
import { useAuth } from "@/lib/auth";
import api from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import avatarImg from "@/assets/avatar.jpg";  // <<--- the custom avatar import

interface CreatePostProps {
  onSuccess: () => Promise<void>;
}

const CreatePost = ({ onSuccess }: CreatePostProps) => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      await api.post("/posts/", { content: text });
      setText("");
      await onSuccess();
    } catch (err) {
      console.error("Failed to post:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-2 p-4 border rounded-lg bg-white">
      <div className="flex gap-2 items-start">
        <img
          src={user.avatar_url || avatarImg}   // <-- fallback to asset avatar
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start a new thread..."
          className="flex-1 resize-none"
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={loading || !text.trim()}>
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
