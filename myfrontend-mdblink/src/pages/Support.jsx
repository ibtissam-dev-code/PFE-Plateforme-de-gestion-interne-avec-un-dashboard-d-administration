import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHeadset, FaEnvelope, FaWhatsapp, FaQuestionCircle, 
  FaPaperPlane, FaChevronDown, FaCheckCircle, FaTimes, FaRobot 
} from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";

function Support() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formSent, setFormSent] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // --- REAL AI CHAT LOGIC ---
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm the MYDBLINK AI. I'm ready to help you manage your projects. How are you today?", sender: "bot" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // ⚠️ حطي الـ API KEY ديالك هنا (جيبيه من Google AI Studio)
  const API_KEY = "ضعي_هنا_الـ_API_KEY_الخاص_بك";

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // 1. زيد ميساج المستخدم لـ الـ UI
    const userMsg = { id: Date.now(), text: inputText, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputText;
    setInputText("");
    setIsTyping(true);

    try {
      // 2. تحويل تاريخ الرسائل لشكل كيفهمو Gemini (History)
      // Gemini كيتسنى 'user' للـ مستخدم و 'model' للـ AI
      const chatHistory = messages.map(m => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));

      // 3. عيط لـ Google AI API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              ...chatHistory, // كنصيفطو التاريخ كامل باش يعقل علينا
              { role: "user", parts: [{ text: currentInput }] }
            ],
            // تعليمات للـ AI باش يعرف راسو شكون (System Instruction)
            systemInstruction: {
                parts: [{ text: "You are MYDBLINK AI Assistant. You help users with project management and platform navigation. Be professional, friendly, and concise." }]
            }
          })
        }
      );

      const data = await response.json();
      
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        const botText = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: "bot" }]);
      } else {
        throw new Error("Invalid response");
      }

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "I'm having trouble connecting to my brain. Please check your internet or API key!", sender: "bot" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const contactMethods = [
    { icon: <FaHeadset />, title: "Live AI", desc: "Real-time Support", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10", action: () => setIsChatOpen(true) },
    { icon: <FaEnvelope />, title: "Email", desc: "support@mydblink.com", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10", action: () => window.location.href = "mailto:support@mydblink.com?subject=Support Request" },
    { icon: <FaWhatsapp />, title: "WhatsApp", desc: "Direct Contact", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", action: () => window.open("https://wa.me/212719151775", "_blank") }
  ];

  return (
    <MainLayout>
      {/* HEADER */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
        <h1 className="text-3xl font-black dark:text-white">Need <span className="text-blue-600">Help?</span></h1>
      </motion.div>

      {/* CONTACT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {contactMethods.map((item, i) => (
          <motion.div key={i} whileHover={{ y: -5 }} onClick={item.action} className="bg-white dark:bg-slate-800 p-5 rounded-[2rem] border dark:border-slate-700 shadow-sm text-center cursor-pointer transition-all">
            <div className={`${item.bg} ${item.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-xl`}>{item.icon}</div>
            <h3 className="font-bold dark:text-white text-sm">{item.title}</h3>
            <p className="text-gray-400 text-[10px]">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* --- LIVE AI CHAT POPUP --- */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 w-[360px] max-h-[500px] bg-white dark:bg-slate-800 shadow-2xl rounded-[2.5rem] z-50 border dark:border-slate-700 overflow-hidden flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-blue-600 p-5 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl"><FaRobot size={18} /></div>
                <div>
                  <p className="text-sm font-black">Real AI Assistant</p>
                  <p className="text-[10px] opacity-80">Powered by Gemini 1.5</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:rotate-90 transition-transform"><FaTimes /></button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 bg-gray-50 dark:bg-slate-900/50 space-y-4 min-h-0">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] leading-relaxed shadow-sm ${
                    msg.sender === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-white dark:bg-slate-800 dark:text-white rounded-tl-none border dark:border-slate-700"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-blue-100 dark:bg-slate-800 p-3 rounded-2xl animate-pulse text-[10px] dark:text-gray-400 font-bold">
                    AI is typing...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-slate-800 border-t dark:border-slate-700 flex gap-2 shrink-0">
              <input 
                type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me anything..." 
                className="flex-1 bg-gray-100 dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-xs outline-none dark:text-white" 
              />
              <button type="submit" disabled={isTyping} className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 shadow-md">
                <FaPaperPlane size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQs & Form Section (Optional to keep) */}
    </MainLayout>
  );
}

export default Support;