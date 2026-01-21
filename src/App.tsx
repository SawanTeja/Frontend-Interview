import { useState } from "react";
import { BlogList } from "./components/ui/BlogList";
import { BlogDetail } from "./components/ui/BlogDetail";
import { CreateBlogForm } from "./components/ui/CreateBlogForm";
import { Button } from "@/components/ui/button";
import { PlusCircle, Sparkles } from "lucide-react";

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
    <div className="relative flex h-screen w-full overflow-hidden font-sans">
      
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-blob mix-blend-multiply filter" />
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-blob animation-delay-2000 mix-blend-multiply filter" />
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl animate-blob animation-delay-4000 mix-blend-multiply filter" />
      </div>

      <aside className="relative z-10 w-1/3 min-w-[340px] max-w-[420px] flex flex-col border-r border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
        <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-primary/20 rounded-lg">
               <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              My Blog
            </h1>
          </div>
          
          <Button 
            className="w-full gap-2 shadow-lg hover:shadow-primary/20 transition-all duration-300" 
            onClick={handleStartCreating} 
            variant={isCreating ? "secondary" : "default"}
          >
            <PlusCircle className="w-4 h-4" />
            Create New Post
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-2 custom-scrollbar">
          <BlogList 
            onSelect={handleSelectBlog} 
            selectedId={selectedId} 
          />
        </div>
      </aside>

      <main className="relative z-10 flex-1 overflow-hidden bg-white/30 backdrop-blur-md">
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

    </div>
  );
}

export default App;