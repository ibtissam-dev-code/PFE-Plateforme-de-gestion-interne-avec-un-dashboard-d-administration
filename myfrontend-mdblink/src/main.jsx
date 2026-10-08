import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/main.css' // Import l-CSS dialk
import { ThemeProvider } from './context/themeContext' // Import ThemeProvider
import { NotificationProvider } from './context/NotificationContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <ThemeProvider>
      <NotificationProvider> {/* <--- Darori hna */}
        <App />
      </NotificationProvider>
    </ThemeProvider>
   
  </React.StrictMode>
)