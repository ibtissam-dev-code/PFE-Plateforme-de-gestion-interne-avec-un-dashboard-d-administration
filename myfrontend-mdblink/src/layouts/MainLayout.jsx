import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    /* bg-white هي اللون البيض (Light) و dark:bg-slate-950 هي الكحل (Dark) */
    <div className="flex min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      
      {/* 1. السايدبار هنا كعنصر Flex مرن */}
      <div className="shrink-0 z-50">
        <Sidebar />
      </div>
      
      {/* 2. المحتوى يمتد ويتقلص تلقائياً وديناميكياً حسب حجم السايدبار بدون أن يختفي تحته شيء */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-screen">
        {/* هاد الـ div حتى هي خاصها تتبع المود */}
        <div className="p-6 flex-1 flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
           <Navbar />
           <main className="mt-8 flex-1">
             {children}
           </main>
        </div>
      </div>

    </div>
  );
};

export default MainLayout;