import { motion } from "framer-motion";
import { Bar, Doughnut, Pie, Line } from "react-chartjs-2";
import { useTheme } from "../context/themeContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// تسجيل المكونات ضروري باش ما يبقاش يطلع الـ Error
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ type, data }) => {
  const { darkMode } = useTheme();
  
  const textColor = darkMode ? "#94a3b8" : "#64748b";
  const gridColor = darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: textColor,
          usePointStyle: true,
          font: { size: 12 }
        },
      },
      tooltip: {
        backgroundColor: darkMode ? "#1e293b" : "#fff",
        titleColor: darkMode ? "#fff" : "#1e293b",
        borderColor: darkMode ? "#334155" : "#e2e8f0",
        borderWidth: 1,
      },
    },
    scales: (type === "bar" || type === "line") ? {
      x: {
        grid: { display: false },
        ticks: { color: textColor }
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor }
      }
    } : {},
  };

  const renderChart = () => {
    switch (type) {
      case "bar": return <Bar data={data} options={options} />;
      case "doughnut": return <Doughnut data={data} options={options} />;
      case "pie": return <Pie data={data} options={options} />;
      case "line": return <Line data={data} options={options} />;
      default: return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full"
    >
      {renderChart()}
    </motion.div>
  );
};

export default Charts;