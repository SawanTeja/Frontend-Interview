import { useBlogs } from "../../hooks/useBlogs";
import { BlogCard } from "./BlogCard";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogListProps {
  onSelect: (id: number) => void;
  selectedId: number | null;
}

export const BlogList = ({ onSelect, selectedId }: BlogListProps) => {
  const { data: blogs, isLoading, isError } = useBlogs();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Glassy Loading Skeletons */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
            <Skeleton className="h-4 w-1/3 bg-white/20" />
            <Skeleton className="h-3 w-full bg-white/10" />
            <Skeleton className="h-3 w-2/3 bg-white/10" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-700">
        <p className="font-medium">Unable to load posts</p>
        <p className="text-xs opacity-70 mt-1">Check your connection</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 pb-20">
      <div className="flex items-center justify-between px-2 mb-2">
        <h2 className="text-sm font-semibold text-blue-900/70 uppercase tracking-wider">
          Recent Posts
        </h2>
        <span className="text-xs text-blue-900/50 bg-blue-100/30 px-2 py-0.5 rounded-full">
          {blogs?.length || 0}
        </span>
      </div>
      
      <div className="flex flex-col gap-3">
        {blogs?.map((blog) => (
          <BlogCard 
            key={blog.id} 
            blog={blog} 
            onClick={onSelect} 
            isActive={selectedId === blog.id}
          />
        ))}
        
        {blogs?.length === 0 && (
          <div className="text-center py-10 px-4 rounded-xl border border-dashed border-white/30 bg-white/5">
            <p className="text-blue-900/60 font-medium">No stories yet</p>
            <p className="text-sm text-blue-900/40 mt-1">Time to write something new!</p>
          </div>
        )}
      </div>
    </div>
  );
};