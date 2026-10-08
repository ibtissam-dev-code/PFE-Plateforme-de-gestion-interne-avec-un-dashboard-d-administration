import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, UserPlus } from "lucide-react"; // أيقونات Lucide العصرية والمتناسقة
import MainLayout from "../layouts/MainLayout";
import EmployeesTable from "../components/EmployeesTable";
import API from "../services/api"; // الـ API service المتصل بـ Laravel

function Employees() {
  // 1. استخدام URL SearchParams (باش يقرأ من الـ Navbar الفوق)
  const [searchParams] = useSearchParams();
  const navbarQuery = searchParams.get("search") || ""; 

  const [employees, setEmployees] = useState([]);
  const [localSearch, setLocalSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 2. جلب الموظفين الحقيقيين من قاعدة البيانات عبر الـ API
  const fetchEmployees = async () => {
    try {
      const response = await API.get('/users');
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Erreur lors du chargement des employés");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // 3. الحذف الحقيقي والآمن من الداتا بيز بـ API.delete
  const handleDelete = async (id) => {
    if (window.confirm("Bghiti t-mseh had l-employé?")) {
      try {
        await API.delete(`/users/${id}`);
        setEmployees(employees.filter((emp) => emp.id !== id));
        alert("Employé supprimé avec succès ! ✨");
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert(error.response?.data?.message || "Erreur lors de la suppression");
      }
    }
  };

  // 4. الفلترة المشتركة (تجمع بين الـ Navbar والبحث المحلي داخل الصفحة)
  const filteredEmployees = employees.filter((emp) => {
    const searchTerm = (navbarQuery || localSearch).toLowerCase();
    return (
      emp.nom?.toLowerCase().includes(searchTerm) ||
      emp.email?.toLowerCase().includes(searchTerm) ||
      emp.role?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <MainLayout>
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2rem] shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-slate-700/80 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 transition-all"
      >
        <div>
          <h1 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">Team Members</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Manage your organization's workforce, internal roles, and system permissions.
          </p>
        </div>

        {/* أدوات البحث والإضافة */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-72">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Quick search..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700 pl-11 pr-4 py-3 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium dark:text-white"
            />
          </div>
          
          <Link
            to="/add-employee"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/20 text-sm flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <UserPlus size={16} /> Add Member
          </Link>
        </div>
      </motion.div>

      {/* TABLE SECTION */}
      <div className="mt-6">
        {loading ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-[2rem] border border-gray-100 dark:border-slate-700">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest animate-pulse">
              Loading Team Records...
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <EmployeesTable employees={filteredEmployees} onDelete={handleDelete} />
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}

export default Employees;