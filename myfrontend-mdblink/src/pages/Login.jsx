import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"; 
import API from '../services/api';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post('/login', { email, password });
      const { user, token } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token); 

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 select-none flex items-center justify-center">

      {/* 🌌 FULL SCREEN BACKGROUND IMAGE */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/logo3.jpeg" 
          className="w-full h-full object-cover scale-105 animate-[pulse_8s_ease-in-out_infinite]"
          alt="Premium Background"
        />
        {/* 🌑 DARK OVERLAY */}
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]"></div>
      </div>

      {/* 💡 ADVANCED LIGHT EFFECTS */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/15 blur-[120px] rounded-full top-[-50px] left-[-50px] animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-blue-600/15 blur-[120px] rounded-full bottom-[-50px] right-[-50px] animate-pulse"></div>

      {/* LOGIN CARD CONTAINER */}
      <div className="relative z-10 w-full max-w-md p-4 animate-[float_6s_ease-in-out_infinite]">

        {/* 🌟 PREMIUM GLASS CARD (تم تعديل اللون هنا ليصبح أزرق/أبيض فاتح وشفاف جداً) */}
        <div className="bg-cyan-950/15 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.2)] hover:border-cyan-400/40 transition-colors duration-500">
          
          {/* 🖼️ MYDBLINK TEXT LOGO IMAGE */}
          <div className="flex flex-col items-center mb-6">
            <img 
              src="/mydblink.png" 
              alt="MYDBLINK" 
              // 💡 تم إضافة الكلاس invert و brightness-200 لقلب اللون الأسود إلى أبيض مضيء برمجياً
              className="h-30 w-auto object-contain invert sepia saturate-[5] hue-rotate-[190deg] brightness-100 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            {/* نص احتياطي */}
            <h1 className="hidden text-4xl font-black text-center text-cyan-300 tracking-tight">
              MYDBLINK
            </h1>
            
            <p className="text-center text-[10px] text-cyan-300/80 font-black mt-2 uppercase tracking-[0.2em] drop-shadow-sm">
              Project Infrastructure Portal
            </p>
          </div>

          {/* ERROR DISPLAY */}
          {error && (
            <div className="bg-rose-500/20 border border-rose-500/30 text-rose-300 px-4 py-3 rounded-xl text-xs font-bold mb-4 text-center animate-[shake_0.3s_ease-in-out]">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">

            {/* EMAIL FIELD */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-cyan-200 uppercase tracking-wider pl-1">Corporate Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/60" size={18} />
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  // جعل خلفية الحقول متناسقة مع الشفافية الجديدة
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950/40 border border-white/10 text-white outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 transition-all text-sm font-medium disabled:opacity-40 placeholder-slate-500"
                />
              </div>
            </div>

            {/* PASSWORD FIELD */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center pl-1">
                <label className="text-[10px] font-bold text-cyan-200 uppercase tracking-wider">Access Password</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/60" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-slate-950/40 border border-white/10 text-white outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 transition-all text-sm font-medium disabled:opacity-40 placeholder-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400/60 hover:text-cyan-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 mt-3 rounded-xl font-black text-xs uppercase tracking-wider text-white
              bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 bg-[length:200%_auto] hover:bg-right
              shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]
              transition-all duration-500 flex items-center justify-center gap-2 group
              ${loading ? 'opacity-50 cursor-not-allowed scale-[0.98]' : 'hover:scale-[1.01]'}`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Establishing Security Link...</span>
                </div>
              ) : (
                <>
                  <span>Establish Connection</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>

          </form>

          {/* 🔗 LINK TO REGISTER PAGE */}
          <p className="text-center text-xs text-slate-300 mt-6 font-medium">
            Don't have an account?{" "}
            <Link to="/register" className="text-cyan-400 hover:underline font-bold transition-all">
              Create Account
            </Link>
          </p>

        </div>
      </div>

      {/* CSS ANIMATIONS */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
          }
        `}
      </style>

    </div>
  );
}

export default Login;