import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Users, UserCircle, FolderGit2, 
  Settings, HelpCircle, LogOut, Flame, Calendar
} from "lucide-react"; 
import { getCurrentUser } from "../utils/auth";

function Sidebar({ children }) {
  const user = getCurrentUser();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false); 

  // الأزرار الخاصة بالآدمين (مع إضافة البروفايل)
  const adminMenu = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Calendar", path: "/calendar", icon: <Calendar size={20} /> }, 
    { name: "Projects", path: "/projects", icon: <FolderGit2 size={20} /> },
    { name: "Help Desk", path: "/support", icon: <HelpCircle size={20} /> },
    { name: "Employees", path: "/employees", icon: <Users size={20} /> },
    { name: "Clients", path: "/clients", icon: <UserCircle size={20} /> },
    { name: "Profile", path: "/profile", icon: <UserCircle size={20} />, isProfile: true }, // 💜 وسم خاص بالبروفايل
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  // الأزرار الخاصة بالموظف
  const employeeMenu = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Calendar", path: "/calendar", icon: <Calendar size={20} /> }, 
    { name: "My Projects", path: "/my-projects", icon: <FolderGit2 size={20} /> },
    { name: "Help Desk", path: "/support", icon: <HelpCircle size={20} /> },
    { name: "Profile", path: "/profile", icon: <UserCircle size={20} />, isProfile: true }, // 💜 وسم خاص بالبروفايل
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  const menu = user?.role === "admin" ? adminMenu : employeeMenu;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#030712] transition-colors duration-500 font-sans overflow-hidden">
      
      {/* ─── FLOATING SIDEBAR ─── */}
      <motion.div
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        animate={{ 
          width: isExpanded ? 280 : 100, 
          margin: isExpanded ? "16px" : "16px 12px"
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed top-0 left-0 h-[calc(100vh-32px)] bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/80 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-50 flex flex-col justify-between overflow-hidden select-none"
      >
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/20 blur-3xl pointer-events-none rounded-full" />

        {/* TOP: LOGO */}
        <div>
          <div className="p-4 flex items-center justify-center gap-3 h-28 border-b border-slate-100 dark:border-slate-800/40">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="w-16 h-12 min-w-[64px] flex items-center justify-center overflow-hidden"
            >
              <img src="/logo.png" alt="Logo Icon" className="w-full h-full object-contain" />
            </motion.div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -10 }}
                  className="h-20 flex items-center flex-1"
                >
                  <img src="/mydblink.png" alt="Mydblink" className="h-full w-auto object-contain dark:invert" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MIDDLE: LINKS */}
          <div className="px-3 py-6 space-y-2">
            {menu.map((item) => {
              const isActive = location.pathname === item.path;
              
              // تحديد كلاسات الألوان بناءً على واش بروفايل أو زر عادي
              const activeBg = item.isProfile 
                ? "from-purple-600 to-indigo-500 shadow-purple-500/20" 
                : "from-blue-600 to-cyan-500 shadow-blue-500/20";

              const textAndIconColor = isActive
                ? "text-white"
                : item.isProfile
                ? "text-purple-500 dark:text-purple-400 hover:text-purple-700" // لون البروفايل البنفسجي 💜
                : "text-blue-500 dark:text-blue-400 hover:text-blue-600"; // لون باقي الأيقونات الأزرق 💙

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-black tracking-widest transition-colors duration-300 group/item ${textAndIconColor}`}
                >
                  {/* Dynamic Background */}
                  {isActive && (
                    <motion.div 
                      layoutId="liquidBg" 
                      className={`absolute inset-0 bg-gradient-to-r ${activeBg} rounded-2xl shadow-lg -z-10`}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}

                  {/* Bouncing Icons */}
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 8 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center transition-transform ${!isExpanded && "mx-auto"}`}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Text */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="whitespace-nowrap uppercase tracking-widest text-[11px] font-black"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>
        </div>

        {/* BOTTOM: CONTROLS & LOGOUT */}
        <div className="p-3 space-y-2">
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/5 border border-blue-500/10 flex items-center gap-3"
            >
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                <Flame size={16} className="animate-bounce" />
              </div>
              <div className="leading-tight">
                <p className="text-[10px] font-black uppercase text-blue-500 tracking-wider">System Active</p>
                <p className="text-[9px] text-slate-400 font-bold">Turbo Mode On</p>
              </div>
            </motion.div>
          )}

          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-4 px-4 py-3.5 bg-rose-50 hover:bg-rose-600 dark:bg-rose-500/10 dark:hover:bg-rose-600 text-rose-600 hover:text-white rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-200 shadow-sm shadow-rose-500/5 group/logout"
          >
            <motion.div whileHover={{ rotate: -15, x: -3 }} className={`flex items-center justify-center ${!isExpanded && "mx-auto"}`}>
              <LogOut size={20} />
            </motion.div>
            <AnimatePresence>
              {isExpanded && (
                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="whitespace-nowrap font-black">
                  Terminate
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* CONTENT CONTAINER */}
      <motion.div 
        animate={{ paddingLeft: isExpanded ? 312 : 132 }} 
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="flex-1 flex flex-col overflow-hidden min-h-screen"
      >
        <main className="p-6 md:p-8 flex-1">
          {children}
        </main>
      </motion.div>

    </div>
  );
}

export default Sidebar;