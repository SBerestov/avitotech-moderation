import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Avito_logo.svg";

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl p-4 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <img 
            src={logo} 
            alt="Логотип" 
            className="h-8 w-auto"
          />
          <span className="text-3xl font-bold text-black bg-[#7d84ff] rounded-4xl px-3 pb-1.25">Модерация</span>
        </div>
        
        <div className="flex gap-2 absolute left-1/2 transform -translate-x-1/2">
          <Link 
            to="/list" 
            className={`text-base text-[#646cff] rounded-3xl py-2.5 px-4.5 ${
              isActive('/list') 
                ? "bg-[#646cff] text-white font-semibold" 
                : "text-[#646cff] hover:bg-gray-100"
            }`}
          >
            Объявления
          </Link>
          <Link 
            to="/stats/summary" 
            className={`text-base text-[#646cff] rounded-3xl py-2.5 px-4.5 ${
              isActive('/stats/summary') 
                ? "bg-[#646cff] text-white font-semibold" 
                : "text-[#646cff] hover:bg-gray-100"
            }`}
          >
            Статистика
          </Link>
        </div>
        
      </div>
    </nav>
  );
}