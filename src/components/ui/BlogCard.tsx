import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Blog } from "../../types";

interface BlogCardProps {
  blog: Blog;
  onClick: (id: number) => void;
  isActive: boolean;
}

export const BlogCard = ({ blog, onClick, isActive }: BlogCardProps) => {
  return (
    <Card 
      onClick={() => onClick(blog.id)}
      className={`
        cursor-pointer group relative overflow-hidden transition-all duration-300 ease-out
        border backdrop-blur-md
        ${isActive 
          ? 'border-primary/50 bg-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] -translate-y-1 ring-1 ring-primary/30' 
          : 'border-white/20 bg-white/10 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:bg-white/20 hover:border-white/40'
        }
      `}
    >
      {/* Decorative gradient blob inside the card for extra depth */}
      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-2xl transition-all group-hover:scale-150 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

      <CardHeader className="pb-3 relative z-10">
        <div className="flex flex-wrap gap-2 mb-2">
          {blog.category.map((cat) => (
            <span 
              key={cat} 
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-white/20 text-blue-900/70 border border-white/20 backdrop-blur-sm"
            >
              {cat}
            </span>
          ))}
        </div>
        <CardTitle className="text-lg font-bold leading-tight text-slate-800">
          {blog.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm mt-1 text-slate-600 font-medium">
          {blog.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>{new Date(blog.date).toLocaleDateString()}</span>
          {isActive && (
             <span className="text-blue-600 animate-pulse">Reading now...</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};