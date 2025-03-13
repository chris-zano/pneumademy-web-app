import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./context/AuthProvider";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { getUser } = useAuth()
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();

    if (!user) {
      navigate('/login');
    }
    else {
      if (location.pathname === "/") {
        navigate('/dashboard');
      }
    }

  })

  return (
    <div className="flex">
      {/* Sidebar (Pass down state control) */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} updateIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} />

      <div className="flex flex-col flex-1">
        {/* Navbar (Pass toggle function) */}
        <Navbar onSidebarToggle={() => setIsSidebarOpen(true)} />

        <main className={` w-full pt-16 ${isCollapsed ? "md:pl-18" : "md:pl-64"} md:pt-16`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
