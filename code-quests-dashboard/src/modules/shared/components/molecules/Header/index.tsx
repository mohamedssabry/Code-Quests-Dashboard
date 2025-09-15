import { Menu, User } from "lucide-react";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex items-center justify-between bg-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 shadow-sm">
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <h1 className="text-base sm:text-lg md:text-xl font-semibold truncate">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <span className="hidden sm:block text-sm md:text-base font-medium">
          Hello, Mohamed
        </span>
        <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-gray-200">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </div>
      </div>
    </header>
  );
}
