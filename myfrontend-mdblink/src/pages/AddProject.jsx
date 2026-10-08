import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import API from "../services/api"; // الـ API service ديالنا الجديد
import { 
  FolderPlus, Layers, ToggleLeft, Calendar, User, UserCheck, ArrowLeft, Check 
} from "lucide-react"; // أيقونات Lucide متناسقة مع الستيل الجديد

function AddProject() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // States باش نخبيو القوائم لي كايجيو من الباكاند ديناميكياً
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);

  // الـ State ديال الـ Formulaire كامل ومقاد
  const [formData, setFormData] = useState({
    nom: "",
    type: "",
    etat: "En Cours", 
    date_debut: "",
    date_fin: "",
    client_id: "",
    user_id: "",
  });

  // جلب الـ Clients والـ Users من الباكاند غير كتحل الصفحة كيفما دارت الـ binôme
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsRes, usersRes] = await Promise.all([
          API.get("/clients"),
          API.get("/users"), 
        ]);
        setClients(clientsRes.data);
        
        if (Array.isArray(usersRes.data)) {
          setUsers(usersRes.data);
        } else if (usersRes.data) {
          setUsers([usersRes.data]); 
        }
      } catch (error) {
        console.error("Error fetching select options:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // تجهيز البيانات بشكل صحيح للـ الباكاند Laravel
    const projectDataToSubmit = {
      nom: formData.nom,
      type: formData.type,
      etat: formData.etat,
      date_debut: formData.date_debut,
      date_fin: formData.date_fin,
      client_id: parseInt(formData.client_id), 
      user_id: parseInt(formData.user_id),     
    };

    try {
      await API.post("/projets", projectDataToSubmit);
      alert("Projet ajouté avec succès ! 🚀");
      navigate("/projects"); 
    } catch (error) {
      console.error("Error adding project:", error);
      alert(error.response?.data?.message || "Erreur lors de l'ajout du projet");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-gray-50 dark:bg-slate-900/50 text-gray-800 dark:text-white border border-gray-100 dark:border-slate-700 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium disabled:opacity-60 disabled:bg-gray-100 dark:disabled:bg-slate-800";

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto pb-4"
      >
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/projects")}
            disabled={loading}
            className="p-3 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-all disabled:opacity-50"
          >
            <ArrowLeft size={14} />
          </motion.button>
          <div>
            <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight flex items-center gap-2">
              Add New Project <FolderPlus className="text-blue-500 text-xl" />
            </h1>
          </div>
        </div>

        {/* Main Form Card - Compact Layout */}
        <div className="bg-white dark:bg-slate-800/80 p-6 md:p-8 rounded-[2rem] shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-slate-700 transition-all">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Project Name */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Project Name</label>
              <div className="relative group">
                <FolderPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Enter project name"
                  required
                  className={inputStyle}
                />
              </div>
            </div>

            {/* Project Type */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Project Type</label>
              <div className="relative group">
                <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="e.g. Web Application, Mobile App"
                  required
                  className={inputStyle}
                />
              </div>
            </div>

            {/* Status (Etat) */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Status</label>
              <div className="relative group">
                <ToggleLeft className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <select
                  name="etat"
                  value={formData.etat}
                  onChange={handleChange}
                  disabled={loading}
                  className={`${inputStyle} appearance-none cursor-pointer pr-8 bg-white dark:bg-slate-900/50`}
                >
                  <option value="En Cours">En Cours</option>
                  <option value="Terminé">Terminé</option>
                  <option value="Bloqué">Bloqué</option>
                </select>
              </div>
            </div>

            {/* Start Date */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Start Date</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="date"
                  name="date_debut"
                  value={formData.date_debut}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className={`${inputStyle} pr-4`}
                />
              </div>
            </div>

            {/* End Date */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">End Date</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="date"
                  name="date_fin"
                  value={formData.date_fin}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className={`${inputStyle} pr-4`}
                />
              </div>
            </div>

            {/* Select Client */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Client</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <select
                  name="client_id"
                  value={formData.client_id}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className={`${inputStyle} appearance-none cursor-pointer pr-8 bg-white dark:bg-slate-900/50`}
                >
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.nom} {client.societe ? `(${client.societe})` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Assigned To */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Assigned To</label>
              <div className="relative group">
                <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <select
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className={`${inputStyle} appearance-none cursor-pointer pr-8 bg-white dark:bg-slate-900/50`}
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.nom} ({user.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="md:col-span-2 flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-[2] bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Check size={14} /> {loading ? "Creating..." : "Create Project"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/projects")}
                disabled={loading}
                className="flex-1 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-300 py-3.5 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-slate-600 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </MainLayout>
  );
}

export default AddProject;