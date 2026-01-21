import { useState } from "react";
import { BlogList } from "./components/ui/BlogList";
import { BlogDetail } from "./components/ui/BlogDetail";
import { CreateBlogForm } from "./components/ui/CreateBlogForm";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  Sparkles, 
  TrendingUp, 
  Hash, 
  ArrowUpRight, 
  Flame,
  LayoutGrid,
  BookOpen,
  Calendar,
  Briefcase,
  Award,
  User,
  Bell
} from "lucide-react";

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSelectBlog = (id: number) => {
    setSelectedId(id);
    setIsCreating(false);
  };

  const handleStartCreating = () => {
    setIsCreating(true);
    setSelectedId(null);
  };

  const handleBackToView = () => {
    setIsCreating(false);
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden font-sans bg-[#F8FAFC]">
      
      <header className="h-16 shrink-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 flex items-center justify-between shadow-sm relative">
        
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600 rounded-lg">
             <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            GlassBlog
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {["Tools", "Practice", "Events", "Job Board", "Points"].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-slate-600">
            <Bell className="w-5 h-5" />
          </button>
          <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 shadow-md shadow-blue-500/20">
            Profile
          </Button>
        </div>
      </header>


      <div className="flex-1 flex overflow-hidden relative">
        
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-blob mix-blend-multiply filter" />
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-2000 mix-blend-multiply filter" />
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-blob animation-delay-4000 mix-blend-multiply filter" />
        </div>

        <aside className="relative z-10 w-[300px] shrink-0 flex flex-col border-r border-white/20 bg-white/10 backdrop-blur-xl hidden md:flex">
          <div className="p-6 border-b border-white/10 bg-white/5">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Dashboard
            </h2>
            
            <Button 
              className="w-full gap-2 shadow-lg hover:shadow-primary/20 transition-all duration-300 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-blue-600" 
              onClick={handleStartCreating} 
            >
              <PlusCircle className="w-4 h-4" />
              Write New Story
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-2 custom-scrollbar">
            <BlogList 
              onSelect={handleSelectBlog} 
              selectedId={selectedId} 
            />
          </div>
        </aside>

        <main className="relative z-10 flex-1 overflow-hidden bg-white/30 backdrop-blur-md border-r border-white/20">
          <div className="h-full w-full overflow-y-auto custom-scrollbar">
              {isCreating ? (
                <div className="w-full h-full p-8 flex items-start justify-center">
                   <CreateBlogForm 
                      onSuccess={handleBackToView} 
                      onCancel={handleBackToView} 
                    />
                </div>
              ) : (
                <BlogDetail id={selectedId} />
              )}
          </div>
        </main>

        <aside className="relative z-10 w-[300px] shrink-0 hidden xl:flex flex-col border-l border-white/20 bg-white/10 backdrop-blur-xl p-6 gap-8">
          
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" /> Trending Now
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group cursor-pointer p-3 rounded-xl hover:bg-white/40 transition-all border border-transparent hover:border-white/30">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full mb-2 inline-block">
                      Tech
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm leading-snug mb-1 group-hover:text-blue-700">
                    The Rise of Quantum Computing in 2026
                  </h4>
                  <span className="text-xs text-slate-500 font-medium">2.4k reads</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Hash className="w-4 h-4 text-purple-600" /> Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Finance", "Travel", "React", "Design", "AI", "Life"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/40 hover:bg-white/60 border border-white/20 text-slate-600 text-xs font-semibold rounded-lg cursor-pointer transition-all">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg relative overflow-hidden group cursor-pointer">
             <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
             <Flame className="w-6 h-6 mb-2 text-yellow-300 animate-pulse" />
             <h4 className="font-bold text-lg mb-1">Go Premium</h4>
             <p className="text-xs text-blue-100 mb-3 leading-relaxed">
               Unlock exclusive articles and remove ads for just $5/mo.
             </p>
             <div className="h-1 w-full bg-blue-500/50 rounded-full overflow-hidden">
               <div className="h-full w-2/3 bg-yellow-400 rounded-full" />
             </div>
          </div>

        </aside>
      </div>

    </div>
  );
}

export default App;