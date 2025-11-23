import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AdsPage } from "./pages/AdsPage";
import { AdPage } from "./pages/AdPage";
import { StatsPage } from "./pages/StatsPage";
import Navbar from "./components/NavBar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="mt-20" />
      
      <Routes>
        <Route path="/" element={<AdsPage />} />
        <Route path="/list" element={<AdsPage />} />
        <Route path="/ads" element={<AdsPage />} />
        <Route path="/ads/:id" element={<AdPage />} />
        <Route path="/stats/summary" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}