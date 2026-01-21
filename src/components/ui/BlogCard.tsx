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
          ? 'border-primary/50 bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] -translate-y-1 ring-1 ring-primary/30' 
          : 'border-white/20 bg-white/10 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:bg-white/20 hover:border-white/40'
        }
      `}
    >
      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-2xl transition-all group-hover:scale-150 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

      <CardHeader className="pb-3 relative z-10 space-y-0">
        
        <div className="flex justify-between items-start w-full mb-3">
          <div className="flex flex-wrap gap-1.5">
            {blog.category.slice(0, 2).map((cat) => (
              <span 
                key={cat} 
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-white/30 text-slate-600 border border-white/20"
              >
                {cat}
              </span>
            ))}
          </div>
          
          <span className="text-[10px] font-medium text-slate-400 tabular-nums shrink-0 ml-2">
            {new Date(blog.date).toLocaleDateString(undefined, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </span>
        </div>

        <CardTitle className="text-base font-bold leading-snug text-slate-800 mb-1.5">
          {blog.title}
        </CardTitle>
        
        <CardDescription className="line-clamp-2 text-xs text-slate-500 font-medium leading-relaxed">
          {blog.description}
        </CardDescription>

      </CardHeader>
      
      {isActive && (
        <CardContent className="pt-0 pb-3 relative z-10 flex justify-end">
           <span className="text-[10px] font-bold text-blue-600 animate-pulse flex items-center gap-1">
             Reading now <span className="w-1.5 h-1.5 rounded-full bg-blue-600"/>
           </span>
        </CardContent>
      )}
    </Card>
  );
};