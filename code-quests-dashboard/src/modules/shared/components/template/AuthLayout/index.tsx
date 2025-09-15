import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white shadow-md rounded-xl p-6 sm:p-8">
        <Outlet />
      </div>
    </div>
  );
}
