import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope, FaBriefcase, FaArrowLeft,
  FaCheckCircle, FaChartPie, FaIdBadge, FaToggleOn
} from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api"; 

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // جلب بيانات المستخدم الحالي لمعرفة هل هو admin أم لا
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await API.get(`/users/${id}`); 
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
        alert("Erreur lors du chargement des données.");
        navigate("/employees");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.put(`/users/${id}`, employee); 
      alert("Employee details updated successfully!");
      navigate("/employees"); 
    } catch (error) {
      console.error("Error updating employee:", error);
      alert(error.response?.data?.message || "Erreur lors ديال modification.");
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

  const inputStyle = "w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-4 pl-12 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all dark:text-white appearance-none";

  return (
    <MainLayout> 
      <div className="max-w-4xl mx-auto"> 
        <button onClick={() => navigate("/employees")} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors font-bold uppercase text-xs tracking-widest" > 
          <FaArrowLeft /> Back to Team 
        </button> 
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-slate-700 transition-all" > 
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"> 
            <div> 
              <h1 className="text-4xl font-black text-gray-800 dark:text-white">Edit Profile</h1> 
              <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium"> 
                Update information for <span className="text-blue-500">#{employee?.id} - {employee?.nom}</span> 
              </p> 
            </div> 
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-blue-500/30"> 
              {employee?.nom ? employee.nom.charAt(0).toUpperCase() : "U"} 
            </div> 
          </div> 
          
          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8"> 
            <div className="relative"> 
              <label className="block mb-3 ml-2 text-sm font-bold text-gray-700 dark:text-gray-300">Full Name</label> 
              <FaIdBadge className="absolute bottom-5 left-5 text-gray-400" /> 
              <input type="text" value={employee?.nom || ""} onChange={(e) => setEmployee({...employee, nom: e.target.value})} className={inputStyle} placeholder="Name" required /> 
            </div> 
            
            <div className="relative"> 
              <label className="block mb-3 ml-2 text-sm font-bold text-gray-700 dark:text-gray-300">Email Address</label> 
              <FaEnvelope className="absolute bottom-5 left-5 text-gray-400" /> 
              <input type="email" value={employee?.email || ""} onChange={(e) => setEmployee({...employee, email: e.target.value})} className={inputStyle} placeholder="email@mydblink.com" required /> 
            </div> 
            
            <div className="relative"> 
              <label className="block mb-3 ml-2 text-sm font-bold text-gray-700 dark:text-gray-300">Job Role</label> 
              <FaBriefcase className="absolute bottom-5 left-5 text-gray-400 z-10" /> 
              <select value={employee?.role || ""} onChange={(e) => setEmployee({...employee, role: e.target.value})} className={inputStyle} > 
                <option value="admin">Admin</option> 
                <option value="user">User</option> 
                <option value="Frontend Developer">Frontend Developer</option> 
                <option value="Backend Developer">Backend Developer</option> 
                <option value="Project Manager">Project Manager</option> 
                <option value="BI Analyst">BI Analyst</option> 
                <option value="UI/UX Designer">UI/UX Designer</option> 
              </select> 
            </div> 
            
            <div className="relative"> 
              <label className="block mb-3 ml-2 text-sm font-bold text-gray-700 dark:text-gray-300">Account Status</label> 
              <FaToggleOn className="absolute bottom-5 left-5 text-gray-400 z-10" /> 
              {/* تعديل الـ value هنا ليقرأ القيمة الافتراضية الصغير "active" وتعديل الـ options */}
              <select value={employee?.status || "active"} onChange={(e) => setEmployee({...employee, status: e.target.value})} className={inputStyle} > 
                <option value="active">Active</option> 
                <option value="inactive">Inactive</option> 
              </select> 
            </div> 
            
            <div className="relative md:col-span-2"> 
              <label className="block mb-3 ml-2 text-sm font-bold text-gray-700 dark:text-gray-300">Assigned Projects</label> 
              <FaChartPie className="absolute bottom-5 left-5 text-gray-400" /> 
              <input type="number" value={employee?.projects || 0} onChange={(e) => setEmployee({...employee, projects: e.target.value})} className={inputStyle} placeholder="Number of projects" disabled={!isAdmin} /> 
            </div> 
            
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-8"> 
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={submitting} className="flex-2 bg-blue-600 text-white px-10 py-4 rounded-2xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50" > 
                <FaCheckCircle /> {submitting ? "Saving..." : "Save Profile Changes"} 
              </motion.button> 
              <button type="button" onClick={() => navigate("/employees")} className="flex-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-8 py-4 rounded-2xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-all font-bold" > 
                Cancel 
              </button> 
            </div> 
          </form> 
        </motion.div> 
      </div> 
    </MainLayout> 
  );
}

export default EditEmployee;