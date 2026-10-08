import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout"; 
import API from "../services/api"; 
// استيراد أيقونات lucide المتناسقة مع الستيل الجديد
import { User, Building, Mail, Phone, FileText, ArrowLeft, Save } from "lucide-react";

function AddClient() {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false); 

  const [formData, setFormData] = useState({
    nom: "",
    societe: "",
    email: "",
    telephone: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post('/clients', formData);
      alert("Client ajouté avec succès !");
      navigate("/clients");
    } catch (error) {
      console.error("Error saving client:", error);
      alert(error.response?.data?.message || "Erreur lors de l'ajout du client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* هيدر الصفحة مع أنيميشن خفيف وزر للرجوع */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">Add New Client</h1>
          <p className="text-gray-500 dark:text-gray-400">Create a new customer profile in your database.</p>
        </div>
        <button
          onClick={() => navigate("/clients")}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
        >
          <ArrowLeft size={18} /> Back to List
        </button>
      </motion.div>

      {/* الفورم بنفس الستيل والـ Border والـ Rounded-3xl ديال الـ Dashboard */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700"
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Client Name */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 mb-2 font-semibold text-sm text-gray-700 dark:text-gray-300">
              <User size={16} className="text-blue-500" /> Client Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nom" 
              value={formData.nom}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter client full name"
              required
              className="w-full border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100 dark:disabled:bg-slate-800"
            />
          </div>

          {/* Company */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-semibold text-sm text-gray-700 dark:text-gray-300">
              <Building size={16} className="text-blue-500" /> Company
            </label>
            <input
              type="text"
              name="societe"
              value={formData.societe}
              onChange={handleChange}
              disabled={loading}
              placeholder="Company name"
              className="w-full border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100 dark:disabled:bg-slate-800"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-semibold text-sm text-gray-700 dark:text-gray-300">
              <Mail size={16} className="text-blue-500" /> Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              placeholder="example@email.com"
              required
              className="w-full border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100 dark:disabled:bg-slate-800"
            />
          </div>

          {/* Phone */}
          <div className="md:col-span-2 md:w-1/2 md:pr-3">
            <label className="flex items-center gap-2 mb-2 font-semibold text-sm text-gray-700 dark:text-gray-300">
              <Phone size={16} className="text-blue-500" /> Phone Number
            </label>
            <input
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              disabled={loading}
              placeholder="+212..."
              className="w-full border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100 dark:disabled:bg-slate-800"
            />
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 mb-2 font-semibold text-sm text-gray-700 dark:text-gray-300">
              <FileText size={16} className="text-blue-500" /> Additional Notes
            </label>
            <textarea
              name="notes"
              rows="4"
              value={formData.notes}
              onChange={handleChange}
              disabled={loading}
              placeholder="Any useful details about this partner..."
              className="w-full border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-2xl px-5 py-4 outline-none resize-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100 dark:disabled:bg-slate-800"
            ></textarea>
          </div>

          {/* Buttons بنسق الألوان الأزرق والرمادي العصري */}
          <div className="md:col-span-2 flex gap-4 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition shadow-md font-bold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Save size={18} /> {loading ? "Saving..." : "Save Client"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/clients")} 
              disabled={loading}
              className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-2xl hover:bg-gray-200 dark:hover:bg-slate-600 transition disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </MainLayout>
  );
}

export default AddClient;