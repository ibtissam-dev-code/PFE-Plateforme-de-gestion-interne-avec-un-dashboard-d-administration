import { motion } from "framer-motion";

function StatCard({ title, value, icon, color }) {
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm dark:shadow-none border border-gray-50 dark:border-slate-700 transition-colors duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">
            {title}
          </p>
          <h2 className="text-4xl font-black mt-2 text-gray-800 dark:text-white">
            {value}
          </h2>
        </div>
        <div className={`${color} p-4 rounded-2xl text-white shadow-lg shadow-current/20`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </motion.div>
  );
}
export default StatCard;