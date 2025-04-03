import { JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Book,
  BookOpen,
  ListChecks,
  Library,
  Settings,
  LogOut,
  LucideMenu,
} from "lucide-react";
import { useAuth } from "../context/AuthProvider";

const Sidebar = ({ isOpen, onClose, updateIsCollapsed, isCollapsed }: { isOpen: boolean; onClose: () => void, updateIsCollapsed: (isCollapsed: boolean) => void, isCollapsed: boolean  }) => {
  const { logout, user } = useAuth();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-slate-500 bg-opacity-50 z-40 md:hidden" onClick={onClose}></div>}

      <aside
        className={`
          fixed left-0 h-full bg-white shadow-lg transition-all z-50 top-16 md:top-16 
          ${isOpen ? "w-64" : "w-0"} 
          md:block 
          ${isCollapsed ? "md:w-16" : "md:w-64"}
          overflow-hidden
        `}
      >

        {/* Collapse button - only visible on larger screens */}
        <button
          onClick={() => updateIsCollapsed(!isCollapsed)}
          className="
            hidden md:flex items-center 
            justify-center p-4 pl-5 cursor-pointer"
        >
          <LucideMenu />
        </button>

        {/* Navigation */}
        <nav className="h-[93%] flex flex-col gap-6 p-4 justify-between">
          <section className="flex flex-col gap-4">

            <SidebarItem to="/dashboard" icon={<LayoutDashboard />} text="Dashboard" onClose={onClose} isCollapsed={isCollapsed} />
            {
              user?.role === "instructor"
              &&
              (
                <SidebarItem to="/courses" icon={<Book />} text="Courses" onClose={onClose} isCollapsed={isCollapsed} />
              )
            }
            {
              user?.role === "learner"
              &&
              (
                <>
                  <SidebarItem to="/courses" icon={<Book />} text="Courses" onClose={onClose} isCollapsed={isCollapsed} />

                  <SidebarItem to="/enrollments" icon={<BookOpen />} text="Enrollments" onClose={onClose} isCollapsed={isCollapsed} /></>
              )
            }
            {/* <SidebarItem to="/submissions" icon={<FileText />} text="Submissions" onClose={onClose} isCollapsed={isCollapsed} /> */}
            <SidebarItem to="/quizzes" icon={<ListChecks />} text="Quizzes" onClose={onClose} isCollapsed={isCollapsed} />
            <SidebarItem to="/resources" icon={<Library />} text="Library" onClose={onClose} isCollapsed={isCollapsed} />
            <SidebarItem to="/settings" icon={<Settings />} text="Settings" onClose={onClose} isCollapsed={isCollapsed} />
          </section>
          <section>
            <LogoutButton logout_callback={logout} icon={<LogOut />} text="Logout" isCollapsed={isCollapsed} />
          </section>
        </nav>
      </aside>
    </>
  );
};

const SidebarItem = ({ to, icon, text, onClose, isCollapsed }: {
  to: string;
  icon: JSX.Element;
  text: string;
  onClose: () => void;
  isCollapsed: boolean;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClose}
      className={`
        relative
        poppins-semibold
        flex items-center gap-3 p-2 rounded-md transition-all
        ${isActive ? "bg-slate-900 text-white font-semibold" : "hover:bg-gray-100 text-gray-900"}
        ${isCollapsed ? "justify-center size-10" : ""}
      `}
    >
      {icon}
      {!isCollapsed && <span className="text-md">{text}</span>}
    </Link>
  );
};

const LogoutButton = ({ logout_callback, icon, text, isCollapsed }: {
  logout_callback: () => void;
  icon: JSX.Element;
  text: string;
  isCollapsed: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={logout_callback}
      className={`
        flex items-center gap-3 p-2 rounded-md transition-all hover:bg-gray-100 text-gray-900
        ${isCollapsed ? "justify-center" : ""}
      `}
    >
      {icon}
      {!isCollapsed && <span className="text-md">{text}</span>}
    </button>
  );
};

export default Sidebar;
