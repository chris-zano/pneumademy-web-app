import { useState } from "react";
import { Bell, Search, Menu, User as UserIcon, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import type { User } from "../types/user";

const Navbar = ({ onSidebarToggle }: { onSidebarToggle: () => void }) => {
  const auth = useAuth();
  const user: User | null = auth.user;


  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 shadow-sm z-50 bg-white flex items-center px-6 justify-between">
      {/* Sidebar Toggle Button (Mobile) */}
      <button onClick={onSidebarToggle} className="md:hidden">
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Logo + Title */}
      <div className="flex items-center gap-2">
        <span className="text-lg font poppins-regular hidden md:block md:text-2xl">📚 Pn</span>
      </div>

      {/* Right Icons */}
      <div className="flex gap-2 relative h-6 mb-1 cursor-pointer text-gray-600">
        <button type="button" className="p-2 rounded-2xl cursor-pointer">
          <Search className="w-6 h-6 cursor-pointer text-gray-600" />
        </button>
        <button type="button" className=" cursor-pointer p-2">
          <Bell className="relative h-6 cursor-pointer text-gray-600" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative h-6 cursor-pointer text-gray-600">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}
            className="
            focus:outline-none flex align-center gap-2 
            border p-2 rounded-2xl cursor-pointer transition-all ease-in-out 250ms
            hover:border-transparent hover:bg-sky-300 hover:text-white
            "
          >
            {
              // user && user?.profilePicture
              //   ? <img src={user?.profilePicture} alt={user?.firstname} className="w-6 h-6 cursor-pointer text-gray-600" />
              //   : <UserIcon className="w-6 h-6 cursor-pointer text-gray-600" />
              <UserIcon className="w-6 h-6 cursor-pointer text-gray-600" />
            }
            <span className="font-semibold">{user?.firstname}</span>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-amber-50 rounded-lg shadow-lg">
              <ul className="flex flex-col p-2">
                <li>
                  <Link to="/profile" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                    <UserIcon className="w-4 h-4 text-gray-600" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                    <Settings className="w-4 h-4 text-gray-600" />
                    Settings
                  </Link>
                </li>
                <li>
                  <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-left">
                    <LogOut className="w-4 h-4 text-gray-600" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
