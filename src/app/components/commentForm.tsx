"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const CommentForm = ({ projectId, onCommentAdded }: { projectId: string; onCommentAdded: (comment: any) => void }) => {
  const [text, setText] = useState("");
  const [ loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!text.trim()) return;

     setLoading(true);

     try  {
      if (!token) {
        alert("Please log in to add a comment.");
        return;
      }

      const response = await api.post( `/comments/${projectId}`, { text }, { headers: { Authorization: `Bearer ${token}` } } );

      onCommentAdded(response.data);

      setText("");
     } catch (err) {
        console.error("Couldn't post comment:", err);
     } finally {
      setLoading(false);
     }

     };
  


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment..."
        className="w-full border border-amber-600 rounded-lg p-2"
        rows={3}
      />
      <button
        type="submit"
        disabled={loading}
        className="self-end  bg-amber-600 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition"
      >
        {loading ? "Posting..." : "Add Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
