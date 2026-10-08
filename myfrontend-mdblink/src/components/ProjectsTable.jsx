import { FaEdit, FaTrash, FaRocket, FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function ProjectsTable({ projects = [], onDelete }) {
  const navigate = useNavigate();

  // 🎨 تعديل الألوان لتطابق الحالات الحقيقية ف الداتابيز بدقة واحترافية
  const statusStyle = (etat) => {
    switch (etat) {
      case "Terminé": 
        return "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
      case "En Cours": 
        return "bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20";
      case "En Attente": 
        return "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20";
      default: 
        return "bg-gray-50 text-gray-500 border-gray-200 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-700";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-blue-500/5 transition-all duration-300 overflow-hidden border border-gray-50 dark:border-slate-800">
      <div className="overflow-x-auto px-4">
        <table className="w-full min-w-[800px] border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-gray-400 uppercase text-[10px] font-black tracking-[0.2em]">
              <th className="px-6 py-4">Project Details</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          
          <motion.tbody 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <AnimatePresence>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <motion.tr 
                    key={project.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="group bg-gray-50/30 dark:bg-slate-800/20 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
                  >
                    {/* Project Name */}
                    <td className="px-6 py-5 first:rounded-l-[1.5rem]">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                          <FaRocket size={14} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800 dark:text-white text-base">
                            {project.nom || "No Name"}
                          </span>
                          <span className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">ID: #{project.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Client */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-400">
                          <FaBuilding size={12} />
                        </div>
                        <span className="text-gray-600 dark:text-gray-300 font-medium italic">
                          {typeof project.client === 'object' ? project.client?.nom : project.client || "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-5">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${statusStyle(project.etat)}`}>
                        {project.etat || "Unknown"}
                      </span>
                    </td>

                    {/* Assigned Person */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-xs font-black shadow-md border-2 border-white dark:border-slate-800">
                          {project.user?.nom ? project.user.nom.charAt(0).toUpperCase() : "?"}
                        </div>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-400">
                          {project.user?.nom || "Unassigned"}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 last:rounded-r-[1.5rem] text-right">
                      {/* 🚀 تم إزالة الأوباسيتي ليظهر بشكل دائم */}
                      <div className="flex gap-2 justify-end transition-opacity duration-300">
                        <button 
                          onClick={() => navigate(`/edit-project/${project.id}`)}
                          className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-xl shadow-sm border border-gray-100 dark:border-slate-600 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all active:scale-90"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button 
                          onClick={() => onDelete && onDelete(project.id)}
                          className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-700 text-rose-500 dark:text-rose-400 rounded-xl shadow-sm border border-gray-100 dark:border-slate-600 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white transition-all active:scale-90"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-20">
                      <FaRocket size={50} className="text-gray-400" />
                      <p className="text-xl font-black italic tracking-widest text-gray-400">Empty Database</p>
                    </div>
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectsTable;