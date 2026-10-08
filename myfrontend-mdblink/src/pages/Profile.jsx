import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, IdCard, CheckCircle } from "lucide-react"; // أيقونات Lucide متناسقة وخفيفة
import MainLayout from "../layouts/MainLayout";
import { getCurrentUser } from "../utils/auth";
import API from "../services/api"; // الـ API service المتصل بـ Laravel

function Profile() {
  const user = getCurrentUser();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.nom || user?.name || "",
    email: user?.email || "",
    password: "",
  });

  // تحديث البيانات وإرسالها للباكاند + مزامنة الـ localStorage
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // إرسال التحديث للباكاند (تعديل المسار حسب الـ Endpoint لي صاوبات الـ binôme)
      const response = await API.put(`/users/${user?.id}`, {
        nom: formData.name,
        email: formData.email,
        ...(formData.password && { password: formData.password }) // صيفط الباسورد فقط إذا كتبو
      });

      // تحديث الداتا ف الـ LocalStorage باش تبان السمية الجديدة ف السيت كامل
      const updatedUser = { ...user, nom: formData.name, name: formData.name, email: formData.formData };
      localStorage.setItem("user", JSON.stringify(response.data.user || updatedUser));

      alert("Profile Updated Successfully ✨");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Erreur lors de la modification du profil");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = "w-full bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700 py-3.5 pl-12 pr-4 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all dark:text-white text-sm font-medium disabled:opacity-60";

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto pb-6">
        
        {/* 1. PROFILE HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-16"
        >
          {/* Cover Gradient - مجموع وأنيق */}
          <div className="h-32 md:h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[2rem] shadow-md"></div>
          
          {/* Avatar Area */}
          <div className="absolute -bottom-10 left-8 flex items-end gap-4">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-[1.5rem] bg-white dark:bg-slate-800 p-1.5 shadow-xl">
              <div className="w-full h-full rounded-[1.2rem] bg-gradient-to-tr from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-3xl font-black text-blue-600 dark:text-blue-400 border-2 border-white dark:border-slate-800">
                {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
              </div>
            </div>

            <div className="mb-2">
              <h2 className="text-2xl font-black text-gray-800 dark:text-white leading-tight">
                {formData.name}
              </h2>
              <span className="inline-block bg-blue-600 text-white px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest shadow-sm mt-1">
                {user?.role || "Member"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* 2. PROFILE CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT SECTION: Summary Identity */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-700/80 shadow-xl shadow-blue-500/5">
              <h3 className="text-xs font-black mb-4 dark:text-white text-gray-800 uppercase tracking-wider flex items-center gap-2">
                <IdCard size={14} className="text-blue-500" /> My Identity
              </h3>
              <div className="space-y-3">
                <div className="flex flex-col p-3 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-100/50 dark:border-slate-700/30">
                  <span className="text-gray-400 font-black text-[9px] uppercase tracking-widest mb-1">Username</span>
                  <span className="text-gray-800 dark:text-white font-bold text-sm">{user?.nom || user?.name}</span>
                </div>
                <div className="flex flex-col p-3 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-100/50 dark:border-slate-700/30">
                  <span className="text-gray-400 font-black text-[9px] uppercase tracking-widest mb-1">Account Status</span>
                  <span className="text-emerald-500 font-bold text-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SECTION: Account Details Form */}
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-slate-700/80 shadow-xl shadow-blue-500/5">
              <h3 className="text-lg font-black mb-6 text-gray-800 dark:text-white tracking-tight">Account Details</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block ml-1 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        disabled={submitting}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={inputStyle}
                        required
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="block ml-1 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        disabled={submitting}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={inputStyle}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Password Update */}
                <div className="space-y-1.5">
                  <label className="block ml-1 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Update Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      disabled={submitting}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className={inputStyle}
                      placeholder="Leave blank to keep current password"
                    />
                  </div>
                </div>

                {/* Save Changes Button */}
                <div className="flex justify-end pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={submitting}
                    className={`w-full md:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm ${
                      submitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <CheckCircle size={14} /> {submitting ? "Saving Changes..." : "Save Profile Changes"}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </MainLayout>
  );
}

export default Profile;