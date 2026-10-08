import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, Briefcase, CheckCircle2 } from "lucide-react"; // أيقونات Lucide العصرية
import MainLayout from "../layouts/MainLayout";
import API from "../services/api"; // الـ API service المتصل بـ Laravel
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Statistics() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    employees_count: 0,
    clients_count: 0,
    projects_count: 0,
    completed_projects_count: 0,
    projects_status: { completed: 0, in_progress: 0, pending: 0 }
  });

  // 1. جلب الإحصائيات الحية والمباشرة من قاعدة البيانات عبر Laravel
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await API.get("/dashboard/statistics"); // الرابط الخاص بالإحصائيات في Laravel
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching statistics from Laravel:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, []);

  // 2. تجهيز بيانات الـ Bar Chart (حالة المشاريع الحقيقية)
  const barData = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        label: "Projects Status",
        data: [
          stats.projects_status.completed,
          stats.projects_status.in_progress,
          stats.projects_status.pending
        ],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)", // Emerald
          "rgba(37, 99, 235, 0.8)",  // Blue
          "rgba(245, 158, 11, 0.8)"   // Amber
        ],
        borderRadius: 8,
      },
    ],
  };

  // 3. تجهيز بيانات الـ Pie Chart (نظرة عامة على النظام)
  const pieData = {
    labels: ["Employees", "Clients", "Projects"],
    datasets: [
      {
        data: [stats.employees_count, stats.clients_count, stats.projects_count],
        backgroundColor: [
          "rgba(139, 92, 246, 0.8)", // Purple
          "rgba(236, 72, 153, 0.8)", // Pink
          "rgba(37, 99, 235, 0.8)"   // Blue
        ],
        borderWidth: 0,
      },
    ],
  };

  // خيارات الرسوم البيانية لتتوافق مع الـ Dark Mode تلقائياً
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: { family: "Inter", weight: "bold", size: 11 },
          color: "currentColor" // يتغير حسب الـ Dark/Light mode تلقائياً
        }
      }
    }
  };

  if (loading) return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest animate-pulse">Compiling Analytics Data...</p>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout>
      {/* HEADER SECTION */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">
          Statistics Dashboard
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Real-time data visualization and operational infrastructure metrics.</p>
      </motion.div>

      {/* CARDS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        
        {/* Card: Employees */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-700/80 shadow-xl shadow-blue-500/5 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Employees</h3>
            <p className="text-3xl font-black mt-2 text-gray-800 dark:text-white">{stats.employees_count}</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-500/10 rounded-2xl text-purple-600 dark:text-purple-400">
            <Users size={22} />
          </div>
        </div>

        {/* Card: Clients */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-700/80 shadow-xl shadow-blue-500/5 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Clients</h3>
            <p className="text-3xl font-black mt-2 text-gray-800 dark:text-white">{stats.clients_count}</p>
          </div>
          <div className="p-4 bg-pink-50 dark:bg-pink-500/10 rounded-2xl text-pink-600 dark:text-pink-400">
            <UserCheck size={22} />
          </div>
        </div>

        {/* Card: Projects */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-700/80 shadow-xl shadow-blue-500/5 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Projects</h3>
            <p className="text-3xl font-black mt-2 text-gray-800 dark:text-white">{stats.projects_count}</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-400">
            <Briefcase size={22} />
          </div>
        </div>

        {/* Card: Completed */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-700/80 shadow-xl shadow-blue-500/5 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Completed</h3>
            <p className="text-3xl font-black mt-2 text-gray-800 dark:text-white">{stats.completed_projects_count}</p>
          </div>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={22} />
          </div>
        </div>

      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">

        {/* Bar Chart: Projects Status */}
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-gray-100 dark:border-slate-700/80 shadow-xl shadow-blue-500/5"
        >
          <h2 className="text-base font-black mb-6 text-gray-800 dark:text-white uppercase tracking-wider">
            Projects Status
          </h2>
          <div className="max-h-[320px] flex justify-center">
            <Bar data={barData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Pie Chart: Global Overview */}
        <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-gray-100 dark:border-slate-700/80 shadow-xl shadow-blue-500/5"
        >
          <h2 className="text-base font-black mb-6 text-gray-800 dark:text-white uppercase tracking-wider">
            Global Overview
          </h2>
          <div className="max-h-[300px] flex justify-center">
            <Pie data={pieData} options={chartOptions} />
          </div>
        </motion.div>

      </div>
    </MainLayout>
  );
}

export default Statistics;