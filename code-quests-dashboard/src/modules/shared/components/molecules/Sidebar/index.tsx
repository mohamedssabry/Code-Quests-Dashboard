import { Home, Settings, LogOut, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const navItems = [
  { name: "Dashboard", icon: Home, path: "/dashboard" },
  { name: "Settings", icon: Settings, path: "/dashboard/settings" },
];

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");

    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white  z-50 transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out md:translate-x-0 md:flex md:flex-col`}
      >
        <div className="flex items-center justify-between p-4 ">
          <span className="text-xl font-bold">My Dashboard</span>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(({ name, icon: Icon, path }) => (
            <Link
              key={name}
              to={path}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
              onClick={onClose}
            >
              <Icon className="w-5 h-5" />
              {name}
            </Link>
          ))}
        </nav>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
