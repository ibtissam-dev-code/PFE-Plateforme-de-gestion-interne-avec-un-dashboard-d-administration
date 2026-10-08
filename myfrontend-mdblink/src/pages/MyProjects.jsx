import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, User, ArrowRight, FolderOpen } from "lucide-react"; // أيقونات Lucide المتناسقة والعصرية
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api"; // الـ API service المتصل بـ Laravel

function MyProjects() {
  const [myProjects, setMyProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  // 1. جلب البيانات من الـ API وتصفيتها حسب الـ user_id الحالي
  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const response = await API.get("/projets");
        // تصفية المشاريع لتظهر فقط الموكلة للمستخدم الحالي
        const filtered = response.data.filter(p => p.user_id === user?.id);
        setMyProjects(filtered);
      } catch (error) {
        console.error("Error fetching my projects:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchMyProjects();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  // 2. الحسابات الديناميكية للإحصائيات المصغرة في الهيدر
  const stats = {
    total: myProjects.length,
    completed: myProjects.filter(p => p.etat === "Completed" || p.status === "Completed").length,
    inProgress: myProjects.filter(p => p.etat === "In Progress" || p.status === "In Progress" || p.etat === "En Cours").length,
  };

  // ميثود ذكي لجلب الألوان بناءً على حالة المشروع
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": 
      case "Terminé":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "In Progress": 
      case "En Cours":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      default: 
        return "bg-gray-500/10 text-gray-500 dark:text-gray-400 border-gray-500/20";
    }
  };

  if (loading) return (
    <MainLayout>
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout>
      {/* 1. HEADER & MINI STATS */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl font-black text-gray-800 dark:text-white tracking-tight">My Workspace</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Tracking your personal contributions, milestones, and assigned tasks.</p>
        </motion.div>

        <div className="flex gap-3">
          <div className="bg-white dark:bg-slate-800 px-5 py-2.5 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center gap-2 transition-all">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{stats.inProgress} In Progress</span>
          </div>
          <div className="bg-white dark:bg-slate-800 px-5 py-2.5 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center gap-2 transition-all">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{stats.completed} Done</span>
          </div>
        </div>
      </div>

      {/* 2. PROJECTS GRID WITH ANIMATION */}
      <AnimatePresence mode="wait">
        {myProjects.length > 0 ? (
          <motion.div 
            initial="hidden" animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {myProjects.map(project => (
              <motion.div 
                key={project.id}
                variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-slate-700/80 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3.5 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400 border border-blue-50 dark:border-blue-500/10">
                      <Rocket size={18} />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(project.etat || project.status)}`}>
                      {project.etat || project.status || "In Progress"}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-gray-800 dark:text-white mb-1.5 leading-snug tracking-tight">
                    {project.nom}
                  </h3>
                  
                  {/* جلب اسم العميل بطريقة مرنة وسليمة سواء كان كائن أو نص */}
                  <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-xs mb-6 font-medium">
                    <User size={12} />
                    <span>Client: <span className="text-gray-600 dark:text-gray-300 font-semibold">{project.client?.nom || project.client || "Non spécifié"}</span></span>
                  </div>
                </div>

                <div>
                  {/* Progress Slider */}
                  <div className="mb-5">
                    <div className="flex justify-between text-xs mb-1.5 font-bold">
                      <span className="text-gray-400 dark:text-gray-500 uppercase tracking-wider">Progress</span>
                      <span className="text-blue-600 dark:text-blue-400 font-black">{project.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-slate-900 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress || 0}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full ${project.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`}
                      />
                    </div>
                  </div>

                  <Link 
                    to={`/projects/${project.id}`} 
                    className="flex items-center justify-center gap-2 w-full bg-gray-50 dark:bg-slate-900/40 text-gray-600 dark:text-gray-300 py-3 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white border border-gray-100 dark:border-slate-700/50 transition-all group"
                  >
                    View Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* 3. EMPTY STATE IN CASE OF NO ASSIGNMENTS */
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 p-16 rounded-[2.5rem] text-center border border-dashed border-gray-200 dark:border-slate-700 max-w-2xl mx-auto"
          >
            <div className="bg-gray-50 dark:bg-slate-900 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-gray-100 dark:border-slate-700">
              <FolderOpen size={32} className="text-gray-300 dark:text-slate-600" />
            </div>
            <h2 className="text-xl font-black text-gray-800 dark:text-white mb-1.5 tracking-tight">No Projects Found</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs mx-auto font-medium leading-relaxed">
              It looks like you haven't been assigned to any projects yet. Contact your administration or team leader for database synchronization.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}

export default MyProjects;