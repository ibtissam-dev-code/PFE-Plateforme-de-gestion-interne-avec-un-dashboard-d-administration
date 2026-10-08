import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, ShieldAlert, Globe, Palette, CheckCircle2, Lock, Eye, EyeOff } from "lucide-react"; 
import MainLayout from "../layouts/MainLayout";
import { useTheme } from "../context/themeContext";
import API from "../services/api"; // 1. استيراد ملف الـ API المتصل بـ Laravel

function Settings() {
  const { darkMode, setDarkMode } = useTheme();
  const [lang, setLang] = useState(localStorage.getItem("lang") || "EN");
  const [loading, setLoading] = useState(true); // لتهيئة التحميل أثناء جلب البيانات من السيرفر

  // --- PROFILE STATE ---
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: ""
  });

  // --- SECURITY STATE ---
  const [showPassFields, setShowPassFields] = useState(false);
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);

  // --- TRANSLATIONS ---
  const content = {
    EN: { title: "Settings", desc: "Manage your account preferences", profile: "Profile Information", theme: "Appearance", security: "Security", lang: "Language", save: "Save Changes", update: "Update Password" },
    FR: { title: "Paramètres", desc: "Gérez vos préférences de compte", profile: "Infos Profil", theme: "Apparence", security: "Sécurité", lang: "Langue", save: "Enregistrer", update: "Modifier Mot de passe" },
    AR: { title: "الإعدادات", desc: "إدارة تفضيلات حسابك الشخصي", profile: "معلومات الحساب", theme: "المظهر", security: "الأمان", lang: "اللغة", save: "حفظ التغييرات", update: "تحديث كلمة السر" }
  };

  // 2. جلب معلومات المستخدم الحقيقي الحالية مباشرة من Laravel API عند فتح الصفحة
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await API.get("/user/profile"); // أو الرابط الذي حددته في Laravel مثل /profile أو /me
        setUserData({
          name: response.data.name || response.data.nom || "",
          email: response.data.email || "",
          role: response.data.role || "Member"
        });
      } catch (error) {
        console.error("Error fetching profile from Laravel:", error);
        // كحل احتياطي إذا فشل الـ API نقرأ من الـ localStorage
        const localUser = JSON.parse(localStorage.getItem("user"));
        if (localUser) {
          setUserData({ name: localUser.nom || localUser.name || "", email: localUser.email || "", role: localUser.role || "" });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // 3. إرسال البيانات المحدثة إلى Laravel لتخزينها في الداتابيز عبر API.put
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put("/user/profile/update", {
        name: userData.name,
        email: userData.email
      });

      // تحديث الـ localStorage بالبيانات الجديدة لتظل متزامنة في باقي صفحات الموقع
      const currentUser = JSON.parse(localStorage.getItem("user")) || {};
      localStorage.setItem("user", JSON.stringify({ ...currentUser, ...response.data.user }));

      alert(lang === "AR" ? "تم تحديث الحساب في قاعدة البيانات بنجاح! ✨" : lang === "FR" ? "Profil mis à jour dans la base de données ! ✨" : "Profile updated in database successfully! ✨");
    } catch (error) {
      console.error("Error updating profile in Laravel:", error);
      alert(error.response?.data?.message || "Erreur lors de la mise à jour");
    }
  };

  // 4. تحديث كلمة السر في لارفيل
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      return alert(lang === "AR" ? "كلمات السر غير متطابقة!" : lang === "FR" ? "Les mots de passe ne correspondent pas !" : "Passwords don't match!");
    }

    try {
      await API.put("/user/password/update", {
        old_password: passwords.old,
        new_password: passwords.new,
        new_password_confirmation: passwords.confirm
      });

      alert(lang === "AR" ? "تم تحديث كلمة السر بنجاح!" : lang === "FR" ? "Mot de passe mis à jour !" : "Password updated successfully!");
      setShowPassFields(false);
      setPasswords({ old: "", new: "", confirm: "" });
    } catch (error) {
      console.error("Error updating password in Laravel:", error);
      alert(error.response?.data?.message || "Erreur mot de passe");
    }
  };

  const handleLangChange = (e) => {
    const selectedLang = e.target.value;
    setLang(selectedLang);
    localStorage.setItem("lang", selectedLang);
  };

  const inputStyle = "w-full bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700 p-4 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all dark:text-white text-sm font-medium";

  if (loading) return (
    <MainLayout>
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout>
      {/* HEADER SECTION */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight transition-colors">
          {content[lang].title}
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{content[lang].desc}</p>
      </motion.div>

      {/* MAIN LAYOUT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-10">
        <div className="lg:col-span-2 space-y-6">
          
          {/* SECTION: PROFILE INFORMATION */}
          <motion.section 
            initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-slate-700/80 transition-all"
          >
            <h3 className="text-base font-black mb-6 flex items-center gap-3 dark:text-white text-gray-800 uppercase tracking-wide">
              <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400"><User size={16} /></div>
              {content[lang].profile}
            </h3>
            
            <form onSubmit={handleProfileUpdate} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
                  <input 
                    type="text" 
                    value={userData.name} 
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                    className={inputStyle} 
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
                  <input 
                    type="email" 
                    value={userData.email} 
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    className={inputStyle} 
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                >
                  <CheckCircle2 size={14} /> {content[lang].save}
                </motion.button>
              </div>
            </form>
          </motion.section>

          {/* SECTION: SECURITY & PASSWORD */}
          <motion.section 
            initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-slate-700/80 transition-all"
          >
            <h3 className="text-base font-black mb-6 flex items-center gap-3 dark:text-white text-gray-800 uppercase tracking-wide">
              <div className="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-xl text-rose-600 dark:text-rose-400"><ShieldAlert size={16} /></div>
              {content[lang].security}
            </h3>
            
            <AnimatePresence mode="wait">
              {!showPassFields ? (
                <motion.button 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setShowPassFields(true)}
                  className="w-full md:w-auto bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-slate-700 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider hover:border-rose-500/30 transition flex items-center justify-center gap-2"
                >
                  <Lock size={14} className="text-rose-500"/> {content[lang].update}
                </motion.button>
              ) : (
                <motion.form 
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  onSubmit={handlePasswordUpdate} className="space-y-4 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <input 
                        type={showPass ? "text" : "password"} 
                        placeholder="Current Password" 
                        className={inputStyle}
                        value={passwords.old}
                        onChange={(e) => setPasswords({...passwords, old: e.target.value})}
                        required
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <input type={showPass ? "text" : "password"} placeholder="New Password" className={inputStyle} value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} required />
                    <input type={showPass ? "text" : "password"} placeholder="Confirm New" className={inputStyle} value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} required />
                  </div>
                  <div className="flex gap-3 justify-end pt-2">
                    <button type="button" onClick={() => setShowPassFields(false)} className="bg-gray-100 dark:bg-slate-700 dark:text-white px-5 py-2.5 rounded-xl text-xs font-bold transition">Cancel</button>
                    <button type="submit" className="bg-rose-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-rose-500/10 transition">Update</button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.section>
        </div>

        {/* SIDEBAR SETTINGS (Appearance & Language) */}
        <div className="space-y-6">
          {/* APPEARANCE */}
          <motion.section 
            initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-slate-700/80 transition-all"
          >
            <h3 className="text-base font-black mb-6 flex items-center gap-3 dark:text-white text-gray-800 uppercase tracking-wide">
              <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-xl text-purple-600 dark:text-purple-400"><Palette size={16} /></div>
              {content[lang].theme}
            </h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-100/30 dark:border-slate-700/20">
              <span className="font-black dark:text-white text-xs uppercase tracking-widest">{darkMode ? "Dark" : "Light"} Mode</span>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300 ${darkMode ? 'bg-blue-600 shadow-lg shadow-blue-500/20' : 'bg-gray-300'}`}
              >
                <motion.div 
                  animate={{ x: darkMode ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="bg-white w-6 h-6 rounded-full shadow-md"
                />
              </button>
            </div>
          </motion.section>

          {/* LANGUAGE */}
          <motion.section 
            initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-slate-700/80 transition-all"
          >
            <h3 className="text-base font-black mb-6 flex items-center gap-3 dark:text-white text-gray-800 uppercase tracking-wide">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400"><Globe size={16} /></div>
              {content[lang].lang}
            </h3>
            <select 
              value={lang} 
              onChange={handleLangChange}
              className="w-full bg-gray-50 dark:bg-slate-900 dark:text-white p-4 rounded-xl outline-none text-xs font-black uppercase tracking-wider border border-gray-100 dark:border-slate-700/50 focus:border-emerald-500 transition-all cursor-pointer"
            >
              <option value="EN">English (US)</option>
              <option value="FR">Français (FR)</option>
              <option value="AR">العربية (MA)</option>
            </select>
          </motion.section>
        </div>
      </div>
    </MainLayout>
  );
}

export default Settings;