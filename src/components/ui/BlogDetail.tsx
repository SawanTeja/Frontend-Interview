import { useBlog } from "../../hooks/useBlogs";
import { Skeleton } from "@/components/ui/skeleton";
import { Tag, Share2, Bookmark, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateReadTime } from "../../lib/utils";
import { useRef, useState, useEffect, useLayoutEffect } from "react";

interface BlogDetailProps {
  id: number | null;
}

export const BlogDetail = ({ id }: BlogDetailProps) => {
  const { data: blog, isLoading, isError } = useBlog(id ? id.toString() : null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  
  const [imageStyle, setImageStyle] = useState({
    scale: 1,
    opacity: 1,
  });

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showReadMoreBtn, setShowReadMoreBtn] = useState(false);

  useEffect(() => {
    setIsDescriptionExpanded(false);
    setShowReadMoreBtn(false);
  }, [id]);

  useLayoutEffect(() => {
    if (descriptionRef.current && blog) {
      const isOverflowing = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
      setShowReadMoreBtn(isOverflowing);
    }
  }, [blog, id]); 

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollTop = scrollRef.current.scrollTop;
      const newScale = Math.max(0.9, 1 - scrollTop / 600);
      const newOpacity = Math.max(0, 1 - scrollTop / 700);

      setImageStyle({
        scale: newScale,
        opacity: newOpacity,
      });
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  if (!id) return <EmptyState />;
  if (isLoading) return <LoadingState />;
  if (isError || !blog) return <ErrorState />;

  return (
    <div ref={scrollRef} className="h-full w-full overflow-y-auto custom-scrollbar bg-transparent relative">
      <div className="w-full">
        
        <div className="sticky top-0 z-0 pt-4 px-4 mb-[-100px]">
          <div 
            className="w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-sm border border-white/20 bg-muted/20 origin-top transition-all duration-100 ease-out will-change-transform"
            style={{
              transform: `scale(${imageStyle.scale})`,
              opacity: imageStyle.opacity,
            }}
          >
            <img 
              src={blog.coverImage} 
              alt={blog.title} 
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/1200x600?text=No+Image'; }}
            />
          </div>
        </div>

        <div className="relative z-10 px-2 pb-20">
          <div className="bg-white/90 backdrop-blur-2xl p-8 rounded-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border border-white/60">
            
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4 break-words">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center text-xs md:text-sm font-medium text-slate-500 mb-8 gap-3">
              <span className="text-blue-600 uppercase tracking-wider font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                {blog.category[0] || "General"}
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1">
                {new Date(blog.date).toLocaleDateString(undefined, { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="text-slate-300">|</span>
              <span>{calculateReadTime(blog.content)} read</span>
            </div>

            <div 
              onClick={() => showReadMoreBtn && setIsDescriptionExpanded(!isDescriptionExpanded)}
              className={`
                group relative p-6 bg-gradient-to-r from-blue-50/80 to-transparent border-l-4 border-blue-500 rounded-r-xl mb-10 
                transition-all duration-300 hover:bg-blue-50
                ${showReadMoreBtn ? 'cursor-pointer' : ''}
              `}
            >
              <p 
                ref={descriptionRef}
                className={`
                  text-lg text-slate-700 italic font-serif leading-relaxed transition-all break-words
                  ${isDescriptionExpanded ? '' : 'line-clamp-2'}
                `}
              >
                {blog.description}
              </p>
              
              {showReadMoreBtn && (
                <div className="mt-2 flex items-center gap-1 text-xs font-bold text-blue-600 uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity select-none">
                   {isDescriptionExpanded ? (
                     <>Read Less <ChevronUp className="w-3 h-3" /></>
                   ) : (
                     <>Read More <ChevronDown className="w-3 h-3" /></>
                   )}
                </div>
              )}
            </div>

            <article className="prose prose-lg prose-slate max-w-none mb-10 break-words">
              <p className="whitespace-pre-line leading-loose text-slate-800 break-words">
                {blog.content}
              </p>
            </article>

            <hr className="border-slate-200 mb-8" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Tag className="w-3 h-3" /> Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {blog.category.map((cat) => (
                    <span key={cat} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer border border-slate-200">
                      #{cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 rounded-full border-slate-300 text-slate-600 h-9 px-4 text-sm">
                  <Bookmark className="w-4 h-4" /> Save
                </Button>
                <Button className="gap-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 h-9 px-4 text-sm">
                  <Share2 className="w-4 h-4" /> Share
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="h-full flex items-center justify-center p-8 text-center opacity-60">
    <div className="space-y-2">
      <div className="text-4xl">👈</div>
      <p className="text-xl font-medium text-slate-800">Select a post to read</p>
    </div>
  </div>
);

const LoadingState = () => (
  <div className="p-4 w-full mx-auto space-y-6">
    <Skeleton className="w-full aspect-[21/9] rounded-2xl bg-slate-200/50" />
    <Skeleton className="h-12 w-3/4 bg-slate-200/50" />
    <div className="flex gap-4"><Skeleton className="h-6 w-32" /><Skeleton className="h-6 w-32" /></div>
    <div className="space-y-4 pt-4">
      <Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" />
    </div>
  </div>
);

const ErrorState = () => (
  <div className="h-full flex items-center justify-center text-red-500 font-medium">
    <div className="flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Failed to load content</div>
  </div>
);