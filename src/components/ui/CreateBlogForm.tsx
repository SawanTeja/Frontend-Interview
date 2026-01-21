import { useState } from "react";
import { useCreateBlog } from "../../hooks/useBlogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image as ImageIcon, PenTool, X, Save, Sparkles } from "lucide-react";

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

  const inputStyles = "bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder:text-slate-400 transition-all rounded-xl";

  return (

    <div className="w-full max-w-4xl mx-auto pb-20">
      
      <div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border border-white/60 overflow-hidden">
        
        <div className="flex items-center justify-between p-8 border-b border-slate-100 bg-white/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
              <PenTool className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create New Story</h2>
              <p className="text-sm text-slate-500 font-medium">Share your insights with the community</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onCancel} 
            className="hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full">
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-slate-700 font-bold ml-1">Blog Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. The Future of Quantum Computing"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className={`h-12 ${inputStyles}`}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="category" className="text-slate-700 font-bold ml-1">Categories (Comma separated)</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="TECH, DESIGN, AI..."
                  value={formData.category}
                  onChange={handleChange}
                  className={`h-12 ${inputStyles}`}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-slate-700 font-bold ml-1">Short Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Write a catchy summary to hook your readers..."
                required
                value={formData.description}
                onChange={handleChange}
                className={`h-12 ${inputStyles}`}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="coverImage" className="text-slate-700 font-bold ml-1 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-500" /> Cover Image URL
              </Label>
              <div className="relative">
                <Input
                  id="coverImage"
                  name="coverImage"
                  placeholder="https://..."
                  value={formData.coverImage}
                  onChange={handleChange}
                  className={`h-12 pl-10 ${inputStyles}`}
                />
                <ImageIcon className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
              </div>
              {formData.coverImage && (
                 <div className="mt-2 h-40 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover opacity-80" />
                 </div>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="content" className="text-slate-700 font-bold ml-1">Story Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Start writing your masterpiece..."
                className={`min-h-[400px] resize-none p-6 text-lg leading-relaxed ${inputStyles}`}
                required
                value={formData.content}
                onChange={handleChange}
              />
            </div>

            <hr className="border-slate-100" />

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={onCancel}
                className="text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              >
                Cancel
              </Button>
              
              <div className="flex gap-4">
                <Button variant="outline" type="button" className="gap-2 border-slate-200 text-slate-600">
                   <Save className="w-4 h-4" /> Save Draft
                </Button>
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 px-8 gap-2 rounded-xl h-11"
                >
                  {isPending ? (
                    "Publishing..."
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> Publish Story
                    </>
                  )}
                </Button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};