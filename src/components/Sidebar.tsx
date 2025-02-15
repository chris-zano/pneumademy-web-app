import { JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Book,
  BookOpen,
  FileText,
  ListChecks,
  Library,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthProvider";

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { logout } = useAuth();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-slate-500 bg-opacity-50 z-40 md:hidden" onClick={onClose}></div>}

      <aside
        className={`fixed left-0 h-full bg-white shadow-lg transition-all z-50 top-16 md:top-16 ${
          isOpen ? "w-64" : "w-0 md:w-64"
        } overflow-hidden md:block`}
      >
        {/* Navigation */}
        <nav className="h-[93%] flex flex-col gap-6 p-4 justify-between">
          <section className="flex flex-col gap-4">
            <SidebarItem to="/dashboard" icon={<LayoutDashboard />} text="Dashboard" onClose={onClose} />
            <SidebarItem to="/courses" icon={<Book />} text="Explore Courses" onClose={onClose} />
            <SidebarItem to="/enrollments" icon={<BookOpen />} text="My Courses" onClose={onClose} />
            <SidebarItem to="/submissions" icon={<FileText />} text="Submissions" onClose={onClose} />
            <SidebarItem to="/quizzes" icon={<ListChecks />} text="Quizzes" onClose={onClose} />
            <SidebarItem to="/resources" icon={<Library />} text="Library" onClose={onClose} />
            <SidebarItem to="/settings" icon={<Settings />} text="Settings" onClose={onClose} />
          </section>
          <section>
            <LogoutButton logout_callback={logout} icon={<LogOut />} text="Logout" />
          </section>
        </nav>
      </aside>
    </>
  );
};

const SidebarItem = ({ to, icon, text, onClose }: { to: string; icon: JSX.Element; text: string; onClose: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClose} // Close sidebar on mobile when clicking a link
      className={`flex items-center gap-3 p-2 rounded-md transition-all ${
        isActive ? "bg-blue-500 text-white font-semibold" : "hover:bg-gray-100 text-gray-900"
      }`}
    >
      {icon}
      <span className="text-md">{text}</span>
    </Link>
  );
};

const LogoutButton = ({ logout_callback, icon, text }: { logout_callback: () => void; icon: JSX.Element; text: string }) => {
  return (
    <button
      type="button"
      onClick={logout_callback}
      className="flex items-center gap-3 p-2 rounded-md transition-all hover:bg-gray-100 text-gray-900"
    >
      {icon}
      <span className="text-md">{text}</span>
    </button>
  );
};

export default Sidebar;
