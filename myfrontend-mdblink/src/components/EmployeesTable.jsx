import { FaEdit, FaTrash, FaEnvelope, FaBriefcase, FaUserShield, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function EmployeesTable({ employees = [], onDelete }) {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-2 rounded-[2.5rem] shadow-xl shadow-blue-500/[0.02] border border-gray-50 dark:border-slate-800/80 transition-all duration-300 overflow-hidden">
      <div className="overflow-x-auto px-4">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="text-left border-b border-gray-100 dark:border-slate-800/60 text-gray-400 uppercase text-[10px] font-black tracking-[0.2em]">
              <th className="pb-6 pt-5 pl-4">Team Member</th>
              <th className="pb-6 pt-5">System Role</th>
              <th className="pb-6 pt-5">Active Projects</th>
              <th className="pb-6 pt-5">Status</th>
              <th className="pb-6 pt-5 text-right pr-4">Actions</th>
            </tr>
          </thead>

          <motion.tbody 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="divide-y divide-gray-50/60 dark:divide-slate-800/40"
          >
            <AnimatePresence>
              {employees.length === 0 ? (
                <motion.tr variants={rowVariants}>
                  <td colSpan="5" className="py-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 opacity-30">
                      <FaBriefcase size={40} className="text-gray-400" />
                      <p className="text-base font-black italic tracking-widest text-gray-400">No Employees Found</p>
                    </div>
                  </td>
                </motion.tr>
              ) : (
                employees.map((employee) => {
                  const projectCount = employee.projets_count || employee.projects || 0;
                  
                  // الحصول على قيمة الحالة الحالية أياً كان اسم الحقل من السيرفر وتحويلها لحروف صغيرة
                  const currentStatus = (employee.status || employee.statut || "active").toLowerCase();
                  
                  // الفحص الدقيق: يكون الموظف نشط فقط إذا كانت الحالة "active" أو "actif"
                  const isUserActive = currentStatus === "active" || currentStatus === "actif";

                  return (
                    <motion.tr
                      key={employee.id}
                      variants={rowVariants}
                      exit={{ opacity: 0, x: -10 }}
                      className="group hover:bg-blue-500/[0.01] dark:hover:bg-slate-800/30 transition-all duration-200"
                    >
                      {/* MEMBER DETAILS */}
                      <td className="py-5 pl-4">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 text-white flex items-center justify-center font-black text-sm shadow-md shadow-blue-500/10 transition-transform group-hover:scale-105 duration-300">
                            {employee.nom?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors text-base">
                              {employee.nom}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5 mt-0.5">
                              <FaEnvelope size={10} className="text-gray-300 dark:text-gray-600" /> {employee.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* ROLE */}
                      <td className="py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold ${
                          employee.role === "admin"
                            ? "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400"
                            : "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                        }`}>
                          {employee.role === "admin" ? <FaUserShield size={12} /> : <FaUser size={10} />}
                          <span className="capitalize">{employee.role}</span>
                        </span>
                      </td>

                      {/* PROJECTS COUNT */}
                      <td className="py-5">
                        <span className={`inline-block px-3 py-1 rounded-xl font-extrabold text-xs transition-all ${
                          projectCount > 0
                            ? "bg-cyan-50 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400 shadow-sm"
                            : "bg-gray-50 text-gray-400 dark:bg-slate-800 dark:text-slate-600"
                        }`}>
                          {projectCount} {projectCount === 1 ? "Project" : "Projects"}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="py-5">
                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${
                          isUserActive
                            ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20"
                            : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/20"
                        }`}>
                          {/* عرض نص منسق وموحد دائماً للمستخدم بتبديل كلمة active/inactive */}
                          {isUserActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="py-5 pr-4">
                        <div className="flex items-center justify-end gap-2">
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(`/edit-employee/${employee.id}`)} 
                            className="bg-blue-50 hover:bg-blue-600 dark:bg-blue-500/10 dark:hover:bg-blue-600 text-blue-600 hover:text-white dark:text-blue-400 dark:hover:text-white p-2.5 rounded-xl transition-all shadow-sm border border-blue-100/30 dark:border-transparent"
                            title="Edit Profile"
                          >
                            <FaEdit size={14} />
                          </motion.button>

                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onDelete(employee.id)} 
                            className="bg-rose-50 hover:bg-rose-600 dark:bg-rose-500/10 dark:hover:bg-rose-600 text-rose-600 hover:text-white dark:text-rose-400 dark:hover:text-white p-2.5 rounded-xl transition-all shadow-sm border border-rose-100/30 dark:border-transparent"
                            title="Remove Member"
                          >
                            <FaTrash size={14} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeesTable;