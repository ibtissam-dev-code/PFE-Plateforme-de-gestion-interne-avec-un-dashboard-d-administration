import { motion } from "framer-motion";
import { FaHeadset, FaArrowRight } from "react-icons/fa"; // استعملنا react-icons للتناسق مع باقي المشروع
import { useNavigate } from "react-router-dom";

function SupportCard() {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-7 rounded-[2.5rem] shadow-xl shadow-blue-500/20 transition-all duration-300 group"
    >
      {/* دوائر ديكورية ف الخلفية كايعطيو مظهر عصري */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors"></div>
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-indigo-400/20 rounded-full blur-2xl"></div>

      <div className="flex items-center gap-5 relative z-10">
        {/* أيقونة بـ خلفية زجاجية (Glassmorphism) */}
        <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-inner border border-white/20">
          <FaHeadset size={30} className="text-white" />
        </div>

        <div>
          <h2 className="text-2xl font-black tracking-tight leading-tight">
            Contact Support
          </h2>
          <p className="text-sm text-blue-100 mt-1 font-medium opacity-90">
            Need help? Our team is online.
          </p>
        </div>
      </div>

      {/* زر تفاعلي */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/support")}
        className="mt-6 w-full bg-white text-blue-600 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.15em] shadow-lg shadow-black/10 flex items-center justify-center gap-2 group/btn transition-all"
      >
        Get Assistance 
        <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
      </motion.button>
    </motion.div>
  );
}

export default SupportCard;