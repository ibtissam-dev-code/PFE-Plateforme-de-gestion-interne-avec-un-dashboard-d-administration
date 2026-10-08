import { useState, useEffect } from "react";    
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import { Search, Filter, Plus } from "lucide-react"; // أيقونات Lucide خفيفة ومتناسقة مع الـ Dark Mode
import MainLayout from "../layouts/MainLayout";    
import ProjectsTable from "../components/ProjectsTable";    
import API from "../services/api"; // الـ API service المتصل بـ Laravel

function Projects() {    
  const [projects, setProjects] = useState([]); 
  const [search, setSearch] = useState("");    
  const [statusFilter, setStatusFilter] = useState("All");    
  const [loading, setLoading] = useState(true);

  // 1. جلب قائمة المشاريع كاملة من الباكاند عبر الـ API
  const fetchProjects = async () => {
    try {
      const response = await API.get("/projets");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      alert("Erreur lors du chargement des projets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {    
    fetchProjects();
  }, []);

  // 2. دالة الحذف الحقيقي والآمن من الداتا بيز بـ API.delete
  const handleDelete = async (id) => {
    if (window.confirm("Bghiti t-mseh had l-projet?")) {
      try {
        await API.delete(`/projets/${id}`);
        setProjects(projects.filter(p => p.id !== id));
        alert("Projet supprimé avec succès ! ✨");
      } catch (error) {
        console.error("Error deleting project:", error);
        alert(error.response?.data?.message || "Erreur lors de la suppression du projet");
      }
    }
  };

  // 3. تصفية المشاريع الذكية (حسب النص المكتوب وحالة المشروع المطابقة للباكاند)
  const filteredProjects = projects.filter((project) => {    
    const matchSearch = project.nom?.toLowerCase().includes(search.toLowerCase());    
    // دعم الحالتين سواء كانت بالإنجليزية أو الفرنسية كما في قاعدة البيانات
    const matchStatus = statusFilter === "All" ? true : (project.etat === statusFilter || project.status === statusFilter);    
    return matchSearch && matchStatus;    
  });    

  // Style رقيق وموحد للـ Inputs
  const inputStyle = "bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700 px-5 py-3 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all dark:text-white text-sm font-medium";

  return (    
    <MainLayout>    
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2rem] shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-slate-700/80 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 transition-all"
      >
        <div>
          <h1 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">Projects</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Manage all company projects, parameters, and live tracking.</p>
        </div>

        {/* أدوات البحث والفلترة والإضافة */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-stretch sm:items-center">
          
          {/* حقل البحث */}
          <div className="relative flex-1 sm:w-60">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search project..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className={`${inputStyle} pl-11 w-full`}
            />
          </div>

          {/* قائمة الفلترة */}
          <div className="relative flex-1 sm:w-48">
            <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)} 
              className={`${inputStyle} pl-11 pr-8 w-full appearance-none bg-none font-semibold cursor-pointer`}
            >
              <option value="All">All Status</option>
              <option value="En Cours">En Cours</option>
              <option value="Terminé">Terminé</option>
              <option value="Bloqué">Bloqué</option>
            </select>
          </div>

          {/* زر إضافة مشروع جديد */}
          <Link 
            to="/add-project" 
            className="bg-blue-600 text-white p-3.5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center active:scale-95"
            title="Create New Project"
          >
             <Plus size={18} />
          </Link>
        </div>
      </motion.div>

      {/* TABLE SECTION */}
      <div className="mt-6">
        {loading ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-[2rem] border border-gray-100 dark:border-slate-700">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest animate-pulse">
              Loading Projects Repository...
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <ProjectsTable projects={filteredProjects} onDelete={handleDelete} />    
          </motion.div>
        )}
      </div>
    </MainLayout>    
  );    
}    

export default Projects;