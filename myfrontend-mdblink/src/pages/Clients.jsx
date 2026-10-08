import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ClientsTable from "../components/ClientsTable";
import { motion } from "framer-motion";
import API from "../services/api"; // الـ API service لي صاوبات الـ binôme لـ Laravel
import { Search, Users, Plus } from "lucide-react"; // أيقونات Lucide متناسقة مع الستيل الجديد

function Clients() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || ""; // قراءة البحث القادم من الـ Navbar

  const [clients, setClients] = useState([]); // مصفوفة فارغة في الأول باش نعمروها من الداتا بيز
  const [localSearch, setLocalSearch] = useState(""); // البحث المحلي لي وسط الصفحة
  const [loading, setLoading] = useState(true);

  // 1. دالة جلب البيانات من الـ API ديال Laravel
  const fetchClients = async () => {
    try {
      const response = await API.get('/clients');
      setClients(response.data); 
    } catch (error) {
      console.error("Error fetching clients:", error);
      alert("Erreur lors du chargement des clients");
    } finally {
      setLoading(false);
    }
  };

  // 2. استدعاء الدالة غير كتحل الصفحة
  useEffect(() => {
    fetchClients();
  }, []);

  // 3. دالة الحذف (Delete) متصلة مع الباكاند بـ الـ API
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce client ?")) {
      try {
        await API.delete(`/clients/${id}`);
        // تحديث الـ state في الحين بلا ما نحتاجو نـريديريجيو الصفحة
        setClients(clients.filter((client) => client.id !== id));
        alert("Client supprimé avec succès ! 🚀");
      } catch (error) {
        console.error("Error deleting client:", error);
        alert("Erreur lors de la suppression du client");
      }
    }
  };

  // 4. الفلترة النهائية الذكية (تجمع بين بحث الـ Navbar والبحث المحلي)
  const filteredClients = clients.filter((client) => {
    const searchTerm = (query || localSearch).toLowerCase();
    return (
      client.nom?.toLowerCase().includes(searchTerm) ||
      (client.societe && client.societe.toLowerCase().includes(searchTerm)) ||
      client.email?.toLowerCase().includes(searchTerm)
    );
  });

  const inputStyle = "bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700 px-5 py-3.5 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all dark:text-white text-sm font-medium";

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1600px] mx-auto"
      >
        {/* HEADER SECTION - FIXED WHITE BOX ISSUE */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-gray-50 dark:border-slate-700 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 transition-all mb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-800 dark:text-white tracking-tight flex items-center gap-3">
              Partners & Clients <Users className="text-blue-500 w-9 h-9" />
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
              Manage your corporate relationships and contacts from database.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Local Search Input */}
            <div className="relative w-full sm:w-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className={`${inputStyle} pl-12 w-full lg:w-72`}
              />
            </div>

            {/* Add Client Button - مع روت الإضافة الصحيح */}
            <Link 
              to="/clients/add" 
              className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2 whitespace-nowrap"
            >
              <Plus size={18} /> Add Client
            </Link>
          </div>
        </div>

        {/* TABLE SECTION */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {loading ? (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-[2.5rem] border border-gray-50 dark:border-slate-700">
              <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
                Loading clients from database...
              </p>
            </div>
          ) : (
            <ClientsTable clients={filteredClients} onDelete={handleDelete} />
          )}
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}

export default Clients;