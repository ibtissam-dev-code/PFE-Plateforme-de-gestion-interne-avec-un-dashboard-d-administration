import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion"; 
import API from "../services/api";
import { User, Mail, Lock, Briefcase, ArrowLeft, Check, UserPlus } from "lucide-react"; // تعويض الأيقونات بـ Lucide المتناسقة مع الستيل الجديد

function AddEmployee() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nom: "", // رديناها nom باش تطابق الباكاند كيفما دارت الـ binôme
    email: "",
    password: "",
    role: "Frontend Developer",
  });

  // Variants للأنميشين (Stagger effect) القديم
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // إرسال البيانات لـ روت الـ Register ف Laravel
      await API.post('/register', formData);
      
      alert("Employé ajouté avec succès ! 🚀");
      navigate("/employees"); 
    } catch (error) {
      console.error("Error adding employee:", error);
      alert(error.response?.data?.message || "Erreur lors de l'ajout de l'employé");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-gray-50 dark:bg-slate-900/50 text-gray-800 dark:text-white border border-gray-100 dark:border-slate-700 rounded-2xl pl-14 pr-6 py-4 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium disabled:opacity-60 disabled:bg-gray-100 dark:disabled:bg-slate-800";

  return (
    <MainLayout>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto pb-10"
      >
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <motion.button 
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/employees")}
              disabled={loading}
              className="p-4 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-700 transition-all disabled:opacity-50"
            >
              <ArrowLeft size={18} />
            </motion.button>
            <div>
              <h1 className="text-4xl font-black text-gray-800 dark:text-white tracking-tight flex items-center gap-3">
                Hire Talent <UserPlus className="text-blue-500" />
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium">Add a new member to your workspace.</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-blue-500/5 border border-gray-50 dark:border-slate-700 transition-all"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Full Name */}
            <motion.div variants={itemVariants} className="space-y-3">
              <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2">Full Name</label>
              <div className="relative group">
                <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  name="nom" // تبدلات لـ nom
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="e.g. Othmane Sabiri"
                  disabled={loading}
                  required
                  className={inputStyle}
                />
              </div>
            </motion.div>

            {/* Email Address */}
            <motion.div variants={itemVariants} className="space-y-3">
              <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2">Email Address</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@mydblink.com"
                  disabled={loading}
                  required
                  className={inputStyle}
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants} className="space-y-3">
              <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2">Password</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-rose-500 transition-colors" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  disabled={loading}
                  required
                  className={inputStyle.replace('focus:ring-blue-500/10', 'focus:ring-rose-500/10').replace('focus:border-blue-500', 'focus:border-rose-500')}
                />
              </div>
            </motion.div>

            {/* Role Selection */}
            <motion.div variants={itemVariants} className="space-y-3">
              <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2">Assigned Role</label>
              <div className="relative group">
                <Briefcase size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors" />
                <select 
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={loading}
                  className={`${inputStyle} appearance-none cursor-pointer font-bold`}
                >
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="BI Analyst">BI Analyst</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="admin">Admin</option> {/* زدت الخيار ديال Admin لي زادت الـ binôme */}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Footer Buttons بنفس تيم الألوان الأزرق والرمادي */}
            <motion.div variants={itemVariants} className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-6">
              <motion.button
                whileHover={!loading ? { scale: 1.02, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.2)" } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                type="submit"
                disabled={loading}
                className={`flex-[2] bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Check size={18} /> {loading ? "Saving..." : "Confirm & Add Member"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => navigate("/employees")}
                disabled={loading}
                className="flex-1 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-300 px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-slate-600 transition-all"
              >
                Discard
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}

export default AddEmployee;