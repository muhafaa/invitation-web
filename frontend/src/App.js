import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import CoverPage from "./pages/CoverPage";
import MainPage from "./pages/MainPage";
import { mockAPI } from "./mock";

// Animation wrapper component
function AnimatedRoutes() {
  const location = useLocation();
  const [weddingData, setWeddingData] = useState(null);
  
  useEffect(() => {
    // Load wedding data
    mockAPI.getWeddingData().then(data => {
      setWeddingData(data);
    });
  }, []);

  if (!weddingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-50 to-navy-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600"></div>
      </div>
    );
  }

  return (
    <div className="app-container" key={location.pathname}>
      <Routes>
        <Route 
          path="/" 
          element={<CoverPage weddingData={weddingData} />} 
        />
        <Route 
          path="/invitation" 
          element={<MainPage weddingData={weddingData} />} 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;