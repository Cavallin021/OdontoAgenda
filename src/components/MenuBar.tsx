import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import calendarSVG from "../assets/calendar.svg";
import teethSVG from "../assets/teeth.svg";
//import teethPlusSVG from "../assets/teethPlus.svg";
import logoutSVG from "../assets/logout.svg";

export default function MenuBar() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  const menuButtonsTemplate =
    "flex gap-2 w-full p-4 h-14 bg-[#3F9691] items-center text-white text-center rounded-xs whitespace-nowrap overflow-hidden cursor-pointer select-none transition-all duration-200 hover:bg-[#318D7F] hover:shadow-lg";

  return (
    <aside className="flex min-w-60 gap-2 flex-col w-1/8 h-screen bg-[#3F9691] border-r border-white/20">
      <div className="flex h-40 text-white items-center justify-center">
        WIP LOGO
      </div>
      <div
        className={menuButtonsTemplate}
        onClick={() => navigate("/dashboard")}
      >
        <img src={calendarSVG} width="32" height="32" alt="Calendário" />
        Calendario
      </div>
      <div
        className={menuButtonsTemplate}
        role="button"
        onClick={() => {
          navigate("/appointments");
        }}
      >
        <img src={teethSVG} width="32" height="32" alt="Minhas Consultas" />
        Minhas consultas
      </div>
      {/*
      <div
        className={menuButtonsTemplate}
        onClick={() => {
          navigate("/appointments/new");
        }}
      >
        <img src={teethPlusSVG} width="32" height="32" alt="Nova Consultas" />
        Nova Consulta
      </div>
      */}
      <div
        className={`${menuButtonsTemplate} mt-auto`}
        onClick={handleLogout}
        role="button"
      >
        <img src={logoutSVG} width="32" height="32" alt="Logout" />
        <span className="hidden md:inline">Sair</span>
      </div>
    </aside>
  );
}
