import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, ShieldAlert, CheckCircle2, AlertCircle } from "lucide-react";
import API from "../services/api";

function CalendarPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await API.get("/projets");
        const data = isAdmin ? response.data : response.data.filter((p) => p.user_id === user?.id);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // توليد خلايا التقويم المصغر
  const blanks = Array(firstDayIndex).fill(null);
  const days = Array.from({ length: totalDays }, (_, i) => new Date(year, month, i + 1));
  const gridCells = [...blanks, ...days];

  // تصفية المشاريع حسب اليوم المحدد
  const selectedDayProjects = projects.filter((p) => {
    if (!p.date_fin) return false;
    const d = new Date(p.date_fin);
    return d.getDate() === selectedDate.getDate() && d.getMonth() === selectedDate.getMonth() && d.getFullYear() === selectedDate.getFullYear();
  });

  const getStatusConfig = (etat) => {
    switch (etat) {
      case "Terminé": case "Completed":
        return { bg: "bg-emerald-500/10 border-emerald-500/20", text: "text-emerald-500", icon: <CheckCircle2 size={16} /> };
      case "En Cours": case "In Progress":
        return { bg: "bg-blue-500/10 border-blue-500/20", text: "text-blue-500", icon: <Clock size={16} /> };
      default:
        return { bg: "bg-rose-500/10 border-rose-500/20", text: "text-rose-500", icon: <ShieldAlert size={16} /> };
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 select-none animate-fadeIn">
        
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="text-blue-500" size={24} /> Ops Schedule
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-xs font-bold mt-0.5">Interactive timeline & micro-calendar synchronization.</p>
        </div>

        {/* ─── SPLIT VIEW LAYOUT ─── */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          
          {/* LEFT: PREMIUM MINI CALENDAR COMPACT */}
          <div className="md:col-span-2 p-5 bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                {months[month]} {year}
              </span>
              <div className="flex items-center gap-1">
                <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 text-center mb-2">
              {daysOfWeek.map((d, i) => (
                <span key={i} className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase">{d}</span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {gridCells.map((date, idx) => {
                if (!date) return <div key={idx} />;
                
                const isSelected = selectedDate.toDateString() === date.toDateString();
                const isToday = new Date().toDateString() === date.toDateString();
                const hasDeadline = projects.some(p => p.date_fin && new Date(p.date_fin).toDateString() === date.toDateString());

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(date)}
                    className={`h-9 w-9 mx-auto flex flex-col items-center justify-center rounded-xl text-xs font-black relative transition-all duration-200 ${
                      isSelected 
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20 scale-105" 
                        : isToday 
                        ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" 
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <span>{date.getDate()}</span>
                    {/* نقطة الإشعار بوجود مشروع */}
                    {hasDeadline && !isSelected && (
                      <span className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: VIBRANT TIMELINE FOR SELECTED DAY */}
          <div className="md:col-span-3 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Deadlines • {selectedDate.toLocaleDateString("en-US", { weekday: 'long', month: 'short', day: 'numeric' })}
              </span>
              <span className="text-[10px] px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-black rounded-lg border border-slate-200/40 dark:border-slate-700/40 uppercase">
                {selectedDayProjects.length} Workflows
              </span>
            </div>

            <div className="space-y-3 min-h-[220px]">
              <AnimatePresence mode="popLayout">
                {selectedDayProjects.length > 0 ? (
                  selectedDayProjects.map((proj, i) => {
                    const cfg = getStatusConfig(proj.etat);
                    return (
                      <motion.div
                        key={proj.id || i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="p-4 bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 rounded-2xl shadow-sm flex items-center justify-between group hover:border-blue-500/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${cfg.bg} ${cfg.text} group-hover:scale-105 transition-transform`}>
                            {cfg.icon}
                          </div>
                          <div>
                            <h3 className="text-sm font-black text-slate-800 dark:text-white tracking-wide">{proj.nom}</h3>
                            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Client ID: {proj.client_id || proj.client?.nom || "Internal"}</p>
                          </div>
                        </div>
                        <div className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 border rounded-xl ${cfg.bg} ${cfg.text}`}>
                          {proj.etat}
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-48 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-center p-6"
                  >
                    <AlertCircle size={24} className="text-slate-300 dark:text-slate-600 mb-2" />
                    <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wide">No Deliveries Scheduled</p>
                    <p className="text-[11px] text-slate-400/70 font-medium mt-0.5">Everything is clear for this specific date.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default CalendarPage;