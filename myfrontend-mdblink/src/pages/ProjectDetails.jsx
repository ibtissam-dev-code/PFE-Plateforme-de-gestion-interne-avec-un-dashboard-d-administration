import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Rocket, User, Calendar, Layers, CheckCircle2, RefreshCw } from "lucide-react"; // أيقونات Lucide العصرية
import MainLayout from "../layouts/MainLayout";
import API from "../services/api"; // الـ API service المتصل بـ Laravel

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [etat, setEtat] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 1. جلب تفاصيل المشروع الحقيقي من الـ API
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await API.get(`/projets/${id}`);
        setProject(response.data);
        setEtat(response.data.etat || "En Cours");
        setProgress(response.data.progress || 0);
      } catch (error) {
        console.error("Error fetching project details:", error);
        alert("Projet non trouvé");
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [id]);

  // 2. إرسال تحديثات الحالة والتقدم معاً إلى الباكاند عبر API.put
  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await API.put(`/projets/${id}`, { 
        etat: etat,
        progress: Number(progress)
      });
      // تحديث حالة الستيت بالداتا الجديدة القادمة من السيرفر
      setProject(response.data.projet || { ...project, etat, progress });
      alert("Projet mis à jour avec succès ! ✨");
    } catch (error) {
      console.error("Error updating project:", error);
      alert(error.response?.data?.message || "Erreur lors de la mise à jour");
    } finally {
      setSubmitting(false);
    }
  };

  // ميثود ديناميكي لألوان الحالات المتناسقة مع الـ Dark Mode
  const getStatusStyle = (status) => {
    switch (status) {
      case "Terminé":
      case "Completed":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "Bloqué":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      default:
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    }
  };

  if (loading) return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest animate-pulse">Loading Project Details...</p>
      </div>
    </MainLayout>
  );

  if (!project) return (
    <MainLayout>
      <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-[2rem] border border-dashed border-gray-200 dark:border-slate-700">
        <p className="text-gray-500 font-medium">Projet introuvable.</p>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2rem] shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-400 hidden sm:block">
              <Rocket size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white tracking-tight">{project.nom}</h1>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold mt-0.5">Project ID: #{project.id}</p>
            </div>
          </div>
          <span className={`self-start sm:self-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${getStatusStyle(project.etat)}`}>
            {project.etat}
          </span>
        </motion.div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT SIDE: DETAILS & PROGRESS BAR */}
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info Card */}
            <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-700/80 shadow-xl shadow-blue-500/5 space-y-4">
              <h3 className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Layers size={14} className="text-blue-500" /> Specifications
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-900/40 rounded-xl">
                  <User size={16} className="text-gray-400" />
                  <div className="text-xs font-bold text-gray-400">Client: <span className="text-gray-800 dark:text-white block sm:inline">{project.client?.nom || project.client || "Non spécifié"}</span></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-900/40 rounded-xl">
                  <Layers size={16} className="text-gray-400" />
                  <div className="text-xs font-bold text-gray-400">Type: <span className="text-gray-800 dark:text-white block sm:inline">{project.type || "Development"}</span></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-900/40 rounded-xl">
                  <Calendar size={16} className="text-gray-400" />
                  <div className="text-xs font-bold text-gray-400">Start Date: <span className="text-gray-800 dark:text-white block sm:inline">{project.date_debut}</span></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-900/40 rounded-xl">
                  <Calendar size={16} className="text-gray-400" />
                  <div className="text-xs font-bold text-gray-400">End Date: <span className="text-gray-800 dark:text-white block sm:inline">{project.date_fin || "Non spécifiée"}</span></div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-50 dark:border-slate-700/50">
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 dark:bg-blue-500/5 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="text-xs font-bold text-gray-400">Assigned To: <span className="text-blue-600 dark:text-blue-400 font-black">{project.user?.nom || project.user?.name || "Non assigné"}</span></div>
                </div>
              </div>
            </div>

            {/* Visual Progress Card */}
            <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-700/80 shadow-xl shadow-blue-500/5">
              <div className="flex justify-between text-xs mb-3 font-bold">
                <span className="text-gray-400 dark:text-gray-500 uppercase tracking-widest">Real-time Completion Rate</span>
                <span className="text-blue-600 dark:text-blue-400 font-black text-sm">{project.progress || 0}%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-slate-900 h-3 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress || 0}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${project.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`}
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: INTERACTIVE UPDATE FORM */}
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white dark:bg-slate-800 p-6 md:p-7 rounded-[2.5rem] border border-gray-100 dark:border-slate-700/80 shadow-xl shadow-blue-500/5 h-full">
              <h3 className="text-lg font-black mb-5 text-gray-800 dark:text-white tracking-tight flex items-center gap-2">
                <RefreshCw size={16} className="text-blue-500" /> Control Desk
              </h3>
              
              <form onSubmit={handleUpdateStatus} className="space-y-4">
                {/* Select Status */}
                <div className="space-y-1.5">
                  <label className="block ml-1 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Project Status</label>
                  <select 
                    value={etat} 
                    onChange={(e) => setEtat(e.target.value)}
                    disabled={submitting}
                    className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700 p-3.5 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-semibold dark:text-white"
                  >
                    <option value="En Cours">En Cours</option>
                    <option value="Terminé">Terminé</option>
                    <option value="Bloqué">Bloqué</option>
                  </select>
                </div>

                {/* Select Progress Slider */}
                <div className="space-y-1.5">
                  <label className="block ml-1 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Completion Metric</label>
                  <select 
                    value={progress} 
                    onChange={(e) => setProgress(e.target.value)}
                    disabled={submitting}
                    className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700 p-3.5 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-semibold dark:text-white"
                  >
                    <option value="0">0%</option>
                    <option value="25">25%</option>
                    <option value="50">50%</option>
                    <option value="75">75%</option>
                    <option value="100">100%</option>
                  </select>
                </div>

                {/* Notes/Comments Textarea */}
                <div className="space-y-1.5">
                  <label className="block ml-1 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Logs / Comments</label>
                  <textarea 
                    placeholder="Provide description changes or blockages context..." 
                    rows="3" 
                    disabled={submitting}
                    className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700 p-4 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium dark:text-white"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-blue-600 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={14} /> {submitting ? "Saving..." : "Commit Update"}
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </MainLayout>
  );
}

export default ProjectDetails;