import { motion } from "framer-motion";
import { FaCircle, FaCheckCircle, FaInfoCircle, FaExclamationCircle, FaBell } from "react-icons/fa";
import { useNotifications } from "../context/NotificationContext"; // Jib l-Logic
import { useNavigate } from "react-router-dom"; // Bach n-tsafro f l-pages

function NotificationDropdown() {
  const { notifications, hasUnread, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const getIcon = (type) => {
    switch (type) {
      case "success": return <FaCheckCircle className="text-emerald-500" />;
      case "warning": return <FaExclamationCircle className="text-amber-500" />;
      default: return <FaInfoCircle className="text-blue-500" />;
    }
  };

  // Logic dial l-click: d-dik l l-blasa 3la 7sab t-tnbih
  const handleNotificationClick = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes("project")) navigate("/projects");
    else if (msg.includes("client")) navigate("/clients");
    else if (msg.includes("employee")) navigate("/employees");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="absolute right-0 mt-3 w-85 sm:w-96 bg-white dark:bg-slate-800 rounded-[1.5rem] shadow-2xl border border-gray-100 dark:border-slate-700 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 border-b dark:border-slate-700 flex items-center justify-between bg-gray-50/50 dark:bg-slate-800/50">
        <h3 className="font-black text-gray-800 dark:text-white flex items-center gap-2">
          Notifications 
          {hasUnread && (
            <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">
              New
            </span>
          )}
        </h3>
        <button 
          onClick={markAllAsRead}
          className="text-[11px] font-bold text-blue-500 hover:text-blue-600 transition-colors uppercase tracking-wider"
        >
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
        {notifications.length > 0 ? (
          notifications.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleNotificationClick(item.message)}
              className="p-5 border-b dark:border-slate-700/50 hover:bg-blue-50/30 dark:hover:bg-blue-500/5 cursor-pointer transition-all group relative"
            >
              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-900 flex items-center justify-center text-lg shadow-sm border border-gray-100 dark:border-slate-700">
                    {getIcon(item.type)} 
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.message}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter">
                       Recently
                    </span>
                    <FaCircle className="text-[4px] text-blue-500" />
                    <span className="text-[10px] font-black text-blue-500/60 uppercase">
                      {item.category || "Alert"}
                    </span>
                  </div>
                </div>

                {/* Dot for Unread (Khass ykon hasUnread true bach t-ban) */}
                {hasUnread && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="p-10 text-center flex flex-col items-center gap-3">
             <FaBell className="text-4xl text-gray-200 dark:text-gray-700" />
             <p className="text-gray-400 font-medium italic">No notifications.</p>
          </div>
        )}
      </div>

      {/* Footer dial NotificationDropdown */}
<div className="p-4 bg-gray-50 dark:bg-slate-900/50 text-center border-t dark:border-slate-700">
  <button 
    onClick={() => navigate("/dashboard")} // <--- HNA FIN ZDNA L-DDIK L DASHBOARD
    className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors active:scale-95"
  >
    View all activity history
  </button>
</div>
    </motion.div>
  );
}

export default NotificationDropdown;