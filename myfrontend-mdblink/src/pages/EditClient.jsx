import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Building, Mail, Phone, FileText, CheckCircle } from "lucide-react"; // أيقونات Lucide المتناسقة
import MainLayout from "../layouts/MainLayout";
import API from "../services/api"; // الـ API service ديال الباكاند

function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  // الـ State كامل مطابق لجدول قاعدة البيانات مع زيادة الـ notes
  const [formData, setFormData] = useState({
    nom: "",
    societe: "",
    email: "",
    telephone: "",
    notes: ""
  });

  // 1. جلب بيانات الكليان الحالية من الباكاند عند فتح الصفحة
  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await API.get(`/clients/${id}`);
        const clientData = response.data;
        setFormData({
          nom: clientData.nom || "",
          societe: clientData.societe || "",
          email: clientData.email || "",
          telephone: clientData.telephone || "",
          notes: clientData.notes || ""
        });
      } catch (error) {
        console.error("Error fetching client details:", error);
        alert("Erreur lors du chargement des informations du client");
        navigate("/clients");
      } finally {
        setLoading(false);
      }
    };
    fetchClientDetails();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 2. تحديث البيانات وإرسالها بـ PUT للـ API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      await API.put(`/clients/${id}`, formData);
      alert("Client mis à jour avec succès ! ✨");
      navigate("/clients");
    } catch (error) {
      console.error("Error updating client:", error);
      alert(error.response?.data?.message || "Erreur lors de la modification du client");
    } finally {
      setSubmitLoading(false);
    }
  };

  const inputStyle = "w-full bg-gray-50 dark:bg-slate-900/50 text-gray-800 dark:text-white border border-gray-100 dark:border-slate-700 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium disabled:opacity-60";

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">Chargement des données du client...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto pb-4">
        {/* زر العودة المنظم */}
        <div className="flex items-center gap-4 mb-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/clients")}
            disabled={submitLoading}
            className="p-3 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-all"
          >
            <ArrowLeft size={14} />
          </motion.button>
          <div>
            <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">
              Edit Client Details
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
              Update information for <span className="text-blue-500 font-bold">#{id} - {formData.nom}</span>
            </p>
          </div>
        </div>

        {/* كارت الفورم المضغوط والأنيق */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800/80 p-6 md:p-8 rounded-[2rem] shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-slate-700 transition-all"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Client Name */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Client Name</label>
              <div className="relative group">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  name="nom"
                  value={formData.nom} 
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="Full Name"
                  disabled={submitLoading}
                  required
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Company / Society</label>
              <div className="relative group">
                <Building size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  name="societe"
                  value={formData.societe} 
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="e.g. OneTech"
                  disabled={submitLoading}
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email} 
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="client@company.com"
                  disabled={submitLoading}
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
              <div className="relative group">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  name="telephone"
                  value={formData.telephone} 
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="+212 600 000 000"
                  disabled={submitLoading}
                />
              </div>
            </div>

            {/* Notes Section - زدتو حيت كاين فـ الـ Database */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Notes</label>
              <div className="relative group">
                <FileText size={16} className="absolute left-4 top-5 text-gray-400" />
                <textarea
                  name="notes"
                  rows="4"
                  value={formData.notes}
                  onChange={handleChange}
                  disabled={submitLoading}
                  placeholder="Additional customer details..."
                  className={`${inputStyle} pl-12 resize-none py-3`}
                ></textarea>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="md:col-span-2 flex gap-3 pt-4">
              <button
                type="submit" 
                disabled={submitLoading}
                className={`flex-[2] bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 ${
                  submitLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <CheckCircle size={14} /> {submitLoading ? "Saving..." : "Save Changes"}
              </button>
              
              <button 
                type="button"
                onClick={() => navigate("/clients")}
                disabled={submitLoading}
                className="flex-1 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-300 py-3.5 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-slate-600 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </MainLayout>
  );
}

export default EditClient;