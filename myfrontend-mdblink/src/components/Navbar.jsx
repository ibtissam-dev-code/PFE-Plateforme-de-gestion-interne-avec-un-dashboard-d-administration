import { getCurrentUser } from "../utils/auth";
import { FaBell, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { motion, AnimatePresence } from "framer-motion"; 
import NotificationDropdown from "./NotificationDropdown";
import { useNotifications } from "../context/NotificationContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. 🎯 عزلنا الكتابة ف state محلي باش ما تخسرش الـ Dashboard وأنت كتكتب
  const [localQuery, setLocalQuery] = useState(""); 

  // 2. 🚀 التنقل والبحث الذكي عند الضغط على Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const lowerVal = localQuery.toLowerCase().trim();
      
      if (lowerVal.includes("client")) {
        navigate("/clients");
        setLocalQuery(""); // مسح الحقل بعد الانتقال
        return;
      }
      if (lowerVal.includes("project") || lowerVal.includes("projet")) {
        navigate("/projects");
        setLocalQuery("");
        return;
      }
      if (lowerVal.includes("employee") || lowerVal.includes("employe") || lowerVal.includes("العمال")) {
        navigate("/employees");
        setLocalQuery("");
        return;
      }
      if (lowerVal.includes("settings")) {
        navigate("/settings");
        setLocalQuery("");
        return;
      }
      if (lowerVal.includes("profile")) {
        navigate("/profile");
        setLocalQuery("");
        return;
      }

      // 🎯 إصلاح مشكل الـ Login: توجيه البحث لـ /dashboard مباشرة عوض الرابط /
      if (localQuery) {
        navigate(`/dashboard?search=${encodeURIComponent(localQuery)}`);
      } else {
        navigate("/dashboard");
      }
    }
  };

  // --- 3. OTHER LOGIC ---
  const user = getCurrentUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { hasUnread } = useNotifications();
  const hideSearchOn = ["/employees", "/projects", "/clients", "/add-employee", "/add-project", "/add-client","/settings","/profile"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname.split("/")[1];
    if (!path || path === "dashboard") return "Dashboard Overview";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const shouldHideSearch = hideSearchOn.some(path => location.pathname.includes(path)) || location.pathname.includes("edit-");

  return (
    <div className={`sticky top-0 z-30 transition-all duration-500 px-4 py-4 ${
        scrolled ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-md" : ""
      }`}>
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl shadow-blue-500/5 px-8 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 transition-all border border-gray-100 dark:border-slate-700">
        
        {/* LEFT SECTION */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
          <h1 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">
            {getPageTitle()}
          </h1>
          <p className="text-gray-400 dark:text-gray-500 text-sm font-medium mt-1">
            Hello, <span className="text-blue-500 font-bold">{user?.name}</span>. Have a productive day!
          </p>
        </motion.div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4 lg:gap-8 flex-wrap lg:flex-nowrap">
          
          {/* SEARCH BAR */}
          {!shouldHideSearch && (
          <div className="relative group flex-1 lg:flex-none">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Type section or project name & Enter..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)} // الكتابة معزولة ومخفية وسط الـ input
              onKeyDown={handleKeyDown} // التنقل والفلترة مكاتفعل تال تضغط Enter
              className="bg-gray-50 dark:bg-slate-900/50 border border-transparent dark:border-slate-700 text-gray-800 dark:text-white rounded-2xl pl-12 pr-5 py-3 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 w-full lg:w-72 transition-all font-medium" 
            />
          </div>
          )}
          <div className="flex items-center gap-4 border-l dark:border-slate-700 pl-4 lg:pl-8">
            {/* NOTIFICATIONS */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative bg-gray-50 dark:bg-slate-900 p-3.5 rounded-2xl text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all shadow-sm border border-transparent hover:border-blue-500/20"
              >
                <FaBell size={20} />
                {hasUnread && (
                  <span className="absolute top-3 right-3 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                )}
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} className="absolute right-0 mt-4 w-80 z-50">
                    <NotificationDropdown />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* PROFILE */}
            <Link to="/profile" className="group flex items-center gap-3">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-gray-800 dark:text-white group-hover:text-blue-500 transition-colors">{user?.name}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 opacity-70">{user?.role}</p>
               </div>
               <motion.div whileHover={{ scale: 1.05, rotate: 5 }} className="relative cursor-pointer">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-xl shadow-blue-500/40 border-2 border-white dark:border-slate-800">
                    {user?.name?.charAt(0).toUpperCase() || "A"}
                  </div>
               </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;