import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api"; // استيراد الـ API المتصل بـ Laravel

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState({
    nom: "", 
    client: "", 
    type: "", 
    date_debut: "", 
    etat: "", 
    assignedTo: "", 
    progress: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 1. جلب بيانات المشروع الحقيقية من قاعدة البيانات (Laravel) عبر الـ id
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await API.get(`/projets/${id}`); // تأكد من المسار الصحيح في الـ API لديك
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
        alert("Erreur lors du chargement des données du projet.");
        navigate("/projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, navigate]);

  // 2. إرسال البيانات المعدلة إلى السيرفر وحفظها في قاعدة البيانات
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.put(`/projets/${id}`, project); 
      alert("Projet mis à jour avec succès ! ✨");
      navigate("/projects");
    } catch (error) {
      console.error("Error updating project:", error);
      alert(error.response?.data?.message || "Erreur lors de la modification du projet.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <MainLayout> 
      <div className="flex items-center justify-center h-[60vh]"> 
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div> 
      </div> 
    </MainLayout> 
  );

  return (
    <MainLayout>
      <div className="bg-white p-8 rounded-3xl shadow-sm max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Project: {project.nom}</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Project Name</label>
            <input type="text" value={project.nom || ""} onChange={(e) => setProject({...project, nom: e.target.value})} className="w-full border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div>
            <label className="block mb-2 font-medium">Status</label>
            <select value={project.etat || ""} onChange={(e) => setProject({...project, etat: e.target.value})} className="w-full border p-4 rounded-2xl outline-none">
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Progress (%)</label>
            <input type="number" value={project.progress || 0} onChange={(e) => setProject({...project, progress: e.target.value})} className="w-full border p-4 rounded-2xl outline-none" min="0" max="100" />
          </div>
          <div className="md:col-span-2 flex gap-4 mt-6">
            <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-10 py-4 rounded-2xl hover:bg-blue-700 transition disabled:opacity-50">
              {submitting ? "Saving..." : "Save Changes"}
            </button>
            <button type="button" onClick={() => navigate("/projects")} className="bg-gray-200 text-gray-700 px-10 py-4 rounded-2xl hover:bg-gray-300 transition">Cancel</button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default EditProject;