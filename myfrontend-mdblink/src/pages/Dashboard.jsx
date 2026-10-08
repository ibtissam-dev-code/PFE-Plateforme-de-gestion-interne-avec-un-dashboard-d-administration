import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import RecentProjectsTable from "../components/ProjectsTable";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Briefcase, CheckCircle, Clock, AlertTriangle, Star, FolderOpen, BarChart3, TrendingUp, Trophy, Medal } from "lucide-react";
import API from "../services/api";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await API.get("/projets");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const displayedProjects = isAdmin
    ? projects
    : projects.filter((p) => p.user_id === user?.id);

  const filteredProjects = displayedProjects.filter((p) =>
    p.nom?.toLowerCase().includes(query.toLowerCase())
  );

  const totalProjects = filteredProjects.length;
  const completedProjects = filteredProjects.filter((p) => p.etat === "Terminé" || p.etat === "Completed").length;
  const pendingProjects = filteredProjects.filter((p) => p.etat === "En Cours" || p.etat === "In Progress").length;
  const blockedProjects = filteredProjects.filter((p) => p.etat === "Bloqué" || p.etat === "Cancelled").length;
  const successRate = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;

  const lineChartData = ["Jan","Feb","Mar","Apr","May"].map((month) => {
    const monthProjects = filteredProjects.filter((p) => {
      if (!p.date_debut) return false;
      const d = new Date(p.date_debut);
      return d.toLocaleString("en-US", { month: "short" }) === month;
    });

    return {
      name: month,
      Active: monthProjects.filter(p => p.etat === "En Cours" || p.etat === "In Progress").length,
      Done: monthProjects.filter(p => p.etat === "Terminé" || p.etat === "Completed").length,
      Hold: monthProjects.filter(p => p.etat === "Bloqué" || p.etat === "Cancelled").length,
    };
  });

  // 🔵 درجات الأزرق الاحترافي الخاصة بالدائرة فقط
  const COLORS = ["#1e40af", "#3b82f6", "#60a5fa", "#93c5fd", "#2563eb", "#1d4ed8"];

  // 🛠️ التعديل الذكي لدمج وتكبير طرف Data Science, Python
  const pieData = Object.entries(
    filteredProjects.reduce((acc, p) => {
      let type = p.type ? p.type.trim() : "Other";
      
      // دمج أي صيغة مكتوبة لـ Data Science أو Python باش يتجمعوا ف نفس الطرف ويكبر النسبة ديالو
      if (type.toLowerCase().includes("data science") || type.toLowerCase().includes("python")) {
        type = "Data Science, Python";
      }
      
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value], index) => ({
    name,
    value,
    color: COLORS[index % COLORS.length]
  }));

  const clientStats = filteredProjects.reduce((acc, p) => {
    const clientName = p.client?.nom || p.client || "Unknown Client";
    acc[clientName] = (acc[clientName] || 0) + 1;
    return acc;
  }, {});
  const topClients = Object.entries(clientStats).sort((a, b) => b[1] - a[1]).slice(0, 3);

  const partnerBadges = [
    { bg: "bg-amber-500/10 border-amber-500/30 text-amber-500", icon: <Trophy size={16} className="text-amber-500" />, stars: "⭐⭐⭐" },
    { bg: "bg-slate-300/20 border-slate-300/40 text-slate-500 dark:text-slate-400", icon: <Medal size={16} className="text-slate-400" />, stars: "⭐⭐" },
    { bg: "bg-amber-700/10 border-amber-700/30 text-amber-700 dark:text-amber-600", icon: <Medal size={16} className="text-amber-700" />, stars: "⭐" }
  ];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20; 
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="currentColor"
        className="text-[10px] font-black text-slate-700 dark:text-slate-300"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6 p-2 min-h-screen select-none">
        
        {/* ─── HEADER SECTION ─── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Welcome back, {user?.nom || "Yassine"}! 👋
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mt-1">Real-time overview of your projects and team performance.</p>
          </div>
        </div>

        {/* ─── STATS CARDS GRID ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Projects */}
          <div className="relative group overflow-hidden p-6 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-50/40 via-white/50 to-white/10 dark:from-blue-950/20 dark:via-slate-900/40 dark:to-slate-900/10 backdrop-blur-md shadow-[0_8px_32px_rgba(59,130,246,0.08)] hover:shadow-[0_16px_32px_rgba(59,130,246,0.08)] hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -right-10 -top-10 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest">Total Projects</p>
                <h3 className="text-4xl font-black mt-3 text-slate-900 dark:text-white tracking-tight">{totalProjects ?? 0}</h3>
                <span className="text-emerald-500 dark:text-emerald-400 text-xs font-black block mt-4 flex items-center gap-1">
                  ↑ 12% <span className="text-slate-400 dark:text-slate-500 font-bold">from last month</span>
                </span>
              </div>
              <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-500/20 group-hover:rotate-6 transition-transform duration-300">
                <Briefcase size={22} />
              </div>
            </div>
          </div>

          {/* Completed Card */}
          <div className="relative group overflow-hidden p-6 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-50/40 via-white/50 to-white/10 dark:from-emerald-950/20 dark:via-slate-900/40 dark:to-slate-900/10 backdrop-blur-md shadow-[0_8px_32px_rgba(16,185,129,0.02)] hover:shadow-[0_16px_32px_rgba(16,185,129,0.08)] hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -right-10 -top-10 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest">Completed</p>
                <h3 className="text-4xl font-black mt-3 text-slate-900 dark:text-white tracking-tight">{completedProjects ?? 0}</h3>
                <span className="text-emerald-500 dark:text-emerald-400 text-xs font-black block mt-4 flex items-center gap-1">
                  ↑ 18% <span className="text-slate-400 dark:text-slate-500 font-bold">from last month</span>
                </span>
              </div>
              <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-500/20 group-hover:rotate-6 transition-transform duration-300">
                <CheckCircle size={22} className="animate-pulse" />
              </div>
            </div>
          </div>

          {/* In Progress Card */}
          <div className="relative group overflow-hidden p-6 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-50/40 via-white/50 to-white/10 dark:from-orange-950/20 dark:via-slate-900/40 dark:to-slate-900/10 backdrop-blur-md shadow-[0_8px_32px_rgba(249,115,22,0.02)] hover:shadow-[0_16px_32px_rgba(249,115,22,0.08)] hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -right-10 -top-10 w-24 h-24 bg-orange-500/10 blur-2xl rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-orange-600 dark:text-orange-400 text-xs font-black uppercase tracking-widest">In Progress</p>
                <h3 className="text-4xl font-black mt-3 text-slate-900 dark:text-white tracking-tight">{pendingProjects ?? 0}</h3>
                <span className="text-orange-500 dark:text-orange-400 text-xs font-black block mt-4 flex items-center gap-1">
                  ↓ 6% <span className="text-slate-400 dark:text-slate-500 font-bold">from last month</span>
                </span>
              </div>
              <div className="p-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl border border-orange-500/20 group-hover:rotate-6 transition-transform duration-300">
                <Clock size={22} />
              </div>
            </div>
          </div>

          {/* Blocked Card */}
          <div className="relative group overflow-hidden p-6 rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-50/40 via-white/50 to-white/10 dark:from-rose-950/20 dark:via-slate-900/40 dark:to-slate-900/10 backdrop-blur-md shadow-[0_8px_32px_rgba(244,63,94,0.02)] hover:shadow-[0_16px_32px_rgba(244,63,94,0.08)] hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -right-10 -top-10 w-24 h-24 bg-rose-500/10 blur-2xl rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-rose-600 dark:text-rose-400 text-xs font-black uppercase tracking-widest">Blocked</p>
                <h3 className="text-4xl font-black mt-3 text-slate-900 dark:text-white tracking-tight">{blockedProjects ?? 0}</h3>
                <span className="text-rose-500 dark:text-rose-400 text-xs font-black block mt-4 flex items-center gap-1">
                  ↓ 4% <span className="text-slate-400 dark:text-slate-500 font-bold">from last month</span>
                </span>
              </div>
              <div className="p-3 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl border border-rose-500/20 group-hover:rotate-6 transition-transform duration-300">
                <AlertTriangle size={22} className="animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* ─── CHARTS SECTION ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/40 backdrop-blur-md shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-slate-900 dark:text-white">
                <BarChart3 size={16} className="text-blue-500"/> Global Performance
              </h3>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 px-3 py-1.5 rounded-xl font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">This Month</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lineChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01}/>
                    </linearGradient>
                    <linearGradient id="colorDone" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.01}/>
                    </linearGradient>
                    <linearGradient id="colorHold" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.01}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#cbd5e130" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-[11px] font-bold text-slate-400" />
                  <YAxis axisLine={false} tickLine={false} className="text-[11px] font-bold text-slate-400" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderColor: '#e2e8f0', borderRadius: '16px', color: '#000', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }} />
                  
                  <Area type="monotone" dataKey="Done" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDone)" />
                  <Area type="monotone" dataKey="Active" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorActive)" />
                  <Area type="monotone" dataKey="Hold" stroke="#f43f5e" strokeWidth={2.5} fillOpacity={1} fill="url(#colorHold)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Panel */}
          <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 p-6 rounded-2xl shadow-lg flex flex-col justify-between text-white relative overflow-hidden border border-white/10 group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white">MYDBLINK Analytics</h2>
              <p className="text-blue-100 text-xs mt-2 leading-relaxed opacity-90 font-medium">
                All project statistics are synchronized in real-time with the database cluster. Keep track of milestones smoothly.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="relative flex items-center justify-center w-20 h-20 bg-black/20 rounded-full p-1 border border-white/20">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-blue-950/60" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-blue-200" strokeDasharray={`${successRate}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute text-base font-black text-blue-100">{successRate}%</div>
              </div>
              <div>
                <div className="text-sm font-black tracking-wide text-white">Success Matrix</div>
                <p className="text-[11px] text-blue-100/80 mt-0.5 font-medium">Optimized performance metrics across all nodes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── LOWER SECTION ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/40 backdrop-blur-md shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-slate-900 dark:text-white">
                <FolderOpen size={16} className="text-blue-500"/> Categories Distribution
              </h3>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 px-2.5 py-1 rounded-lg text-slate-500 dark:text-slate-400 font-bold">All Time</span>
            </div>
            
            <div className="h-56 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={65} 
                    dataKey="value"
                    labelLine={true} 
                    label={renderCustomizedLabel} 
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        style={{ outline: 'none' }}
                      />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Partners Panel */}
          <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/40 backdrop-blur-md shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-slate-900 dark:text-white">
                <Star size={16} className="text-amber-500"/> Top Partners Podiums
              </h3>
              <button className="text-xs text-blue-500 font-black hover:underline tracking-wide uppercase">View all</button>
            </div>
            
            <div className="space-y-3">
              {(topClients.length > 0 ? topClients : [["Digital Ocean", 24], ["Tech Innovators", 18], ["Creative Studio", 15]]).map(([nom, count], index) => {
                const badge = partnerBadges[index] || { bg: "bg-amber-500/10 border-amber-500/30 text-amber-500", icon: <Star size={16} />, stars: "" };
                return (
                  <div key={index} className="flex items-center justify-between p-3.5 bg-gradient-to-r from-slate-50/80 to-slate-100/30 dark:from-slate-800/40 dark:to-slate-800/10 rounded-xl border border-slate-200/40 dark:border-slate-700/40 hover:scale-[1.01] transition-transform duration-200">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border shadow-sm ${badge.bg}`}>
                        {badge.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-sm text-slate-800 dark:text-slate-200 tracking-wide">{nom}</h4>
                          <span className="text-[10px] tracking-tight">{badge.stars}</span>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">{count} Active Workflows</p>
                      </div>
                    </div>
                    <div className="text-emerald-600 dark:text-emerald-400 text-xs font-black flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      <TrendingUp size={12} /> {index === 0 ? "↑ 24%" : index === 1 ? "↑ 12%" : "↑ 5%"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ─── RECENT PROJECTS WORKSPACE ─── */}
        <div className="p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/40 backdrop-blur-md shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-slate-900 dark:text-white">
              <div className="w-1.5 h-3.5 bg-blue-500 rounded-full"></div> Recent Operational Activity
            </h3>
            <button className="text-xs text-slate-400 dark:text-slate-500 font-black hover:text-blue-500 transition-colors tracking-wide uppercase">View all projects →</button>
          </div>
          <RecentProjectsTable projects={filteredProjects.slice(0, 5)} /> 
        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;