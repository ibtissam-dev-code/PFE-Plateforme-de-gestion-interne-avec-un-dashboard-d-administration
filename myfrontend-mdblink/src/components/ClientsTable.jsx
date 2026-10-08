import { FaEdit, FaTrash, FaUserTie, FaEnvelope, FaPhoneAlt, FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function ClientsTable({ clients = [], onDelete }) {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-2 rounded-[2rem] shadow-sm transition-all duration-300">
      <div className="overflow-x-auto px-4">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="text-left border-b border-gray-100 dark:border-slate-800">
              <th className="pb-6 pt-4 font-bold text-gray-400 uppercase text-xs tracking-widest pl-4">Client</th>
              <th className="pb-6 pt-4 font-bold text-gray-400 uppercase text-xs tracking-widest">Société</th>
              <th className="pb-6 pt-4 font-bold text-gray-400 uppercase text-xs tracking-widest">Contact</th>
              <th className="pb-6 pt-4 font-bold text-gray-400 uppercase text-xs tracking-widest text-right pr-4">Actions</th>
            </tr>
          </thead>
          
          <motion.tbody 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="divide-y divide-gray-50 dark:divide-slate-800"
          >
            <AnimatePresence>
              {clients.length > 0 ? (
                clients.map((client) => (
                  <motion.tr 
                    key={client.id}
                    variants={rowVariants}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group hover:bg-gray-50/80 dark:hover:bg-slate-800/40 transition-all duration-200"
                  >
                    <td className="py-5 pl-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm border border-blue-100 dark:border-blue-800/30">
                          <FaUserTie size={18} />
                        </div>
                        <span className="font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {client.nom}
                        </span>
                      </div>
                    </td>

                    <td className="py-5">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <FaBuilding className="text-gray-300 dark:text-gray-600" size={14} />
                        <span className="font-medium">{client.societe}</span>
                      </div>
                    </td>

                    <td className="py-5">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <FaEnvelope size={12} className="text-blue-400" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 font-mono">
                          <FaPhoneAlt size={12} />
                          {client.telephone}
                        </div>
                      </div>
                    </td>

                    <td className="py-5 pr-4">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => navigate(`/edit-client/${client.id}`)}
                          className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-3 rounded-xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 group/btn"
                        >
                          <FaEdit className="group-hover/btn:rotate-12 transition-transform" />
                        </button>

                        <button 
                          onClick={() => onDelete(client.id)}
                          className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-xl hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all duration-300 group/btn"
                        >
                          <FaTrash className="group-hover/btn:shake transition-transform" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr variants={rowVariants}>
                  <td colSpan="4" className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3 opacity-40">
                      <FaUserTie size={40} className="text-gray-400" />
                      <p className="text-gray-500 dark:text-gray-400 font-medium italic">Aucun client trouvé.</p>
                    </div>
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientsTable;