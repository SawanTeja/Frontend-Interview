import { useState } from "react";
import { useCreateBlog } from "../../hooks/useBlogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon, PenTool, X } from "lucide-react";

interface CreateBlogFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CreateBlogForm = ({ onSuccess, onCancel }: CreateBlogFormProps) => {
  const { mutate, isPending } = useCreateBlog();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    coverImage: "",
    content: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryArray = formData.category.split(",").map((c) => c.trim().toUpperCase());
    mutate(
      { ...formData, category: categoryArray },
      { onSuccess: () => onSuccess() }
    );
  };

  const inputStyles = "bg-white/20 border-white/30 focus:bg-white/40 focus:border-primary/50 placeholder:text-slate-500/60 backdrop-blur-sm transition-all";

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4">
      
      <div className="w-full max-w-3xl glass rounded-2xl p-1 shadow-2xl animate-float">
        
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-700">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Write a New Story</h2>
              <p className="text-xs text-slate-500 font-medium">Share your thoughts with the world</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel} className="hover:bg-red-500/10 hover:text-red-600 rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-600 font-semibold">Blog Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. The Future of AI"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className={inputStyles}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-600 font-semibold">Categories</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="TECH, DESIGN..."
                  value={formData.category}
                  onChange={handleChange}
                  className={inputStyles}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-600 font-semibold">Short Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="A quick summary that hooks the reader..."
                required
                value={formData.description}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage" className="text-slate-600 font-semibold flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Cover Image URL
              </Label>
              <Input
                id="coverImage"
                name="coverImage"
                placeholder="https://..."
                value={formData.coverImage}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-slate-600 font-semibold">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Start writing your masterpiece..."
                className={`min-h-[250px] resize-none ${inputStyles}`}
                required
                value={formData.content}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-4 justify-end pt-4 border-t border-white/10">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="border-white/40 bg-white/10 hover:bg-white/30 text-slate-700"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isPending}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25"
              >
                {isPending ? "Publishing..." : "Publish Blog"}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};