import { motion } from "framer-motion";
import { FaArrowRight, FaProjectDiagram, FaCalendarAlt, FaBuilding } from "react-icons/fa";

// حيدنا const projects باش نستقبلو الداتا كـ props
function ProjectTable({ projects = [] }) {
  // عدلنا الشروط باش يطابقو Laravel (Terminé, En Cours, Annulé/Bloqué)
  const statusStyle = (etat) => {
    switch (etat) {
      case "Terminé":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20";
      case "Annulé":
      case "Bloqué":
        return "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-200 dark:border-rose-500/20";
      default:
        return "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-800 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white flex items-center gap-3">
            <FaProjectDiagram className="text-blue-500" /> Important Projects
          </h2>
          <p className="text-sm text-gray-400 mt-1">Overview of the latest high-priority tasks</p>
        </div>

        <button className="group flex items-center gap-2 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-5 py-2.5 rounded-2xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all font-bold text-sm">
          View All <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-50 dark:border-slate-800">
              <th className="pb-5 font-bold text-gray-400 uppercase text-xs tracking-widest">Project</th>
              <th className="pb-5 font-bold text-gray-400 uppercase text-xs tracking-widest">Client</th>
              <th className="pb-5 font-bold text-gray-400 uppercase text-xs tracking-widest">Date</th>
              <th className="pb-5 font-bold text-gray-400 uppercase text-xs tracking-widest">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {projects.map((project, index) => (
              <motion.tr
                key={project.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-all"
              >
                <td className="py-5 font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.nom}
                </td>

                <td className="py-5">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FaBuilding size={12} className="opacity-40" />
                    <span className="font-medium">
                      {typeof project.client === 'object' ? project.client?.nom : project.client || "N/A"}
                    </span>
                  </div>
                </td>

                <td className="py-5">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500 text-sm">
                    <FaCalendarAlt size={12} className="opacity-40" />
                    <span>{project.created_at ? project.created_at.substring(0, 10) : project.date || "N/A"}</span>
                  </div>
                </td>

                <td className="py-5">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${statusStyle(project.etat)}`}
                  >
                    {project.etat}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default ProjectTable;