import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ChartLine, Rocket, CheckCircle, Clock, UserTie } from "lucide-react"; // أيقونات Lucide المتناسقة والعصرية
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";
import ProjectsTable from "../components/ProjectsTable";
import Charts from "../components/Charts";
import { getCurrentUser } from "../utils/auth";
import API from "../services/api"; // الـ API service المتصل بـ Laravel

function EmployeeDashboard() {
  const user = getCurrentUser();
  const [myProjects, setMyProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. جلب المشاريع الحقيقية من الـ API وفلترتها حسب المستخدم الحالي
  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const response = await API.get("/projets");
        
        // الفلترة بالـ ID أو بالـ اسم (الـ ID آمن ومستحسن ف قاعدة البيانات)
        const filtered = response.data.filter(
          (project) => 
            project.user_id === user?.id || 
            project.assignedTo === user?.name
        );
        setMyProjects(filtered);
      } catch (error) {
        console.error("Error fetching employee dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMyProjects();
  }, [user]);

  // --- 2. DATA LOGIC (الحسابات الديناميكية بناءً على بيانات قاعدة البيانات) ---
  // الباكاند غالباً يستعمل "etat" أو "status"، هاد السطر كيدعمهوم بجوج لتفادي الأخطاء
  const completed = myProjects.filter(p => p.etat === "Completed" || p.status === "Completed").length;
  const inProgress = myProjects.filter(p => p.etat === "In Progress" || p.status === "In Progress" || p.etat === "En Cours").length;
  const cancelled = myProjects.filter(p => p.etat === "Cancelled" || p.status === "Cancelled").length;
  const total = myProjects.length;

  // حساب عدد العملاء الفريدين لي خدام معاهم هاد الموظف
  const myClientsCount = [...new Set(myProjects.map(p => typeof p.client === 'object' ? p.client?.nom : p.client))].filter(Boolean).length;

  // نسبة النجاح والإنتاجية للموظف
  const successRate = total > 0 ? ((completed / total) * 100).toFixed(0) : 0;

  // إعداد بيانات الـ Chart الدائري
  const chartData = {
    labels: ["Completed", "In Progress", "Cancelled"],
    datasets: [{
      data: [completed, inProgress, cancelled],
      backgroundColor: ["#10b981", "#3b82f6", "#f43f5e"],
      borderWidth: 0,
    }],
  };

  if (loading) return (
    <MainLayout>
      <div className="flex items-center justify-center h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout>
      {/* 1. WELCOME HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 p-2 rounded-xl border border-blue-50 dark:border-blue-500/20">
              <Calendar size={14} />
            </div>
            <span className="text-gray-400 dark:text-gray-500 font-bold uppercase text-[10px] tracking-widest">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <h1 className="text-4xl font-black text-gray-800 dark:text-white tracking-tight">
            Welcome back, <span className="text-blue-600">{user?.nom || user?.name}</span>! 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm font-medium">
            You have <span className="text-blue-500 font-bold">{inProgress} active projects</span> to focus on today.
          </p>
        </div>

        {/* كارت كفاءة الموظف الإنتاجية */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 p-5 rounded-2xl text-white shadow-xl shadow-blue-500/10 flex items-center gap-4 w-full md:w-auto"
        >
          <div className="bg-white/10 p-3 rounded-xl border border-white/10">
            <ChartLine size={20} />
          </div>
          <div>
            <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest">Your Efficiency</p>
            <p className="text-2xl font-black">{successRate}%</p>
          </div>
        </motion.div>
      </motion.div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        <StatCard title="My Projects" value={total} icon={<Rocket size={18} />} color="bg-blue-600" />
        <StatCard title="Completed" value={completed} icon={<CheckCircle size={18} />} color="bg-emerald-500" />
        <StatCard title="In Progress" value={inProgress} icon={<Clock size={18} />} color="bg-sky-500" />
        <StatCard title="My Clients" value={myClientsCount} icon={<UserTie size={18} />} color="bg-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3. PERFORMANCE CHART */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-xl shadow-blue-500/5"
        >
          <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-white tracking-tight">Project Status Mix</h3>
          <div className="h-60">
            {total > 0 ? (
              <Charts type="doughnut" data={chartData} />
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-gray-400 font-medium">No records found</div>
            )}
          </div>
          <div className="mt-6 space-y-2">
             <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-400 dark:text-gray-500 uppercase tracking-wider">Completion Rate</span>
                <span className="dark:text-white text-gray-700">{successRate}%</span>
             </div>
             <div className="w-full bg-gray-100 dark:bg-slate-900 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${successRate}%` }}
                  transition={{ duration: 0.6 }}
                  className="bg-emerald-500 h-full rounded-full"
                />
             </div>
          </div>
        </motion.div>

        {/* 4. MY RECENT WORK TABLE */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-xl shadow-blue-500/5"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white tracking-tight">Recent Assignments</h3>
              <p className="text-xs text-gray-400 font-medium mt-0.5">Your top 4 active or recently managed projects</p>
            </div>
          </div>
          
          {myProjects.length > 0 ? (
            <ProjectsTable projects={myProjects.slice(0, 4)} />
          ) : (
            <div className="py-16 text-center text-sm text-gray-400 font-medium">
              You haven't been assigned to any projects yet.
            </div>
          )}
        </motion.div>

      </div>
    </MainLayout>
  );
}

export default EmployeeDashboard;