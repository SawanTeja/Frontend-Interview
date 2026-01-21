import { useBlog } from "../../hooks/useBlogs";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, BookOpen, AlertCircle, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogDetailProps {
  id: number | null;
}

export const BlogDetail = ({ id }: BlogDetailProps) => {
  const { data: blog, isLoading, isError } = useBlog(id ? id.toString() : null);

  // --- EMPTY STATE ---
  if (!id) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-inner animate-float">
           <BookOpen className="w-10 h-10 text-blue-600/60" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-3 tracking-tight">Welcome Back</h2>
        <p className="text-slate-500 text-lg max-w-md leading-relaxed">
          Select a story from the sidebar to immerse yourself in reading.
        </p>
      </div>
    );
  }

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div className="w-full h-full bg-white/40">
        <Skeleton className="w-full h-[40vh] bg-slate-200/50" />
        <div className="max-w-4xl mx-auto px-8 -mt-20 relative z-10">
          <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/40 space-y-4">
             <Skeleton className="h-12 w-3/4 bg-slate-200/50" />
             <div className="flex gap-4">
               <Skeleton className="h-10 w-24 rounded-lg bg-slate-200/50" />
               <Skeleton className="h-10 w-24 rounded-lg bg-slate-200/50" />
             </div>
          </div>
          <div className="mt-10 space-y-6">
            <Skeleton className="h-4 w-full bg-slate-200/50" />
            <Skeleton className="h-4 w-full bg-slate-200/50" />
            <Skeleton className="h-4 w-full bg-slate-200/50" />
            <Skeleton className="h-4 w-2/3 bg-slate-200/50" />
          </div>
        </div>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (isError || !blog) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-100 p-8 rounded-2xl text-center text-red-800 shadow-sm">
           <AlertCircle className="w-10 h-10 mx-auto mb-4 opacity-50" />
           <p className="font-medium">Failed to load content.</p>
        </div>
      </div>
    );
  }

  // --- MAIN MAGAZINE LAYOUT ---
  return (
    <div className="min-h-full pb-32 bg-transparent">
      
      {/* 1. HERO IMAGE (Full Bleed) */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 z-10" />
        <img 
          src={blog.coverImage} 
          alt={blog.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/1200x600?text=No+Image';
          }}
        />
      </div>

      {/* 2. OVERLAPPING HEADER CARD */}
      <div className="relative z-20 max-w-4xl mx-auto px-6">
        
        {/* Title Container */}
        <div className="-mt-32 backdrop-blur-3xl bg-white/80 border border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-[2rem] p-8 md:p-12">
          
          {/* Badge & Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {blog.category.map((cat) => (
                <span 
                  key={cat} 
                  className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-blue-100 text-blue-700 border border-blue-200"
                >
                  {cat}
                </span>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full bg-transparent border-slate-300 hover:bg-blue-50">
                <Bookmark className="w-4 h-4 text-slate-600" />
              </Button>
              <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white gap-2 px-6">
                <Share2 className="w-4 h-4" /> Share
              </Button>
            </div>
          </div>

          {/* Big Title */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] mb-8">
            {blog.title}
          </h1>

          {/* Meta Data Grid (Like Reference) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 border-t border-b border-slate-200/60">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Date</p>
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>{new Date(blog.date).toLocaleDateString(undefined, { 
                  month: 'short', day: 'numeric', year: 'numeric' 
                })}</span>
              </div>
            </div>
            
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Read Time</p>
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>5 Mins</span>
              </div>
            </div>

            <div className="hidden md:block">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Author</p>
               <div className="flex items-center gap-2 text-slate-700 font-semibold">
                 <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
                 <span>Admin</span>
               </div>
            </div>
          </div>
        </div>

        {/* 3. BIG READABLE CONTENT */}
        <article className="mt-16 max-w-none">
          {/* We use a custom style block here for maximum readability */}
          <div className="prose prose-xl prose-slate md:prose-2xl max-w-none">
            <p className="
              text-xl md:text-2xl leading-[2] text-slate-800 font-serif
              first-letter:text-6xl first-letter:font-bold first-letter:text-blue-600 first-letter:float-left first-letter:mr-3 first-letter:mt-[-6px]
              whitespace-pre-line
            ">
              {blog.content}
            </p>
          </div>
        </article>

        {/* Footer Divider */}
        <div className="mt-24 flex flex-col items-center justify-center space-y-4">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <div className="w-2 h-2 rounded-full bg-blue-200" />
            </div>
            <p className="text-sm text-slate-400 font-medium italic">Thanks for reading</p>
        </div>

      </div>
    </div>
  );
};