import { Link, useLocation } from "react-router";
import {
  BookOpenIcon,
  LayoutDashboardIcon,
  SparklesIcon,
} from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/30 border-b border-purple-500/20 shadow-lg">
      <div className="w-full px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-all" />
            <SparklesIcon className="w-8 h-8 text-white relative z-10" />
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-wide">
            InterviewFlow
          </span>
        </Link>

        <div className="flex items-center gap-2">

          <Link
            to="/problems"
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2
              ${
                isActive("/problems")
                  ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg"
                  : "bg-slate-900/40 text-gray-300 hover:bg-slate-800/60"
              }
            `}
          >
            <BookOpenIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Problems</span>
          </Link>

          <Link
            to="/dashboard"
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2
              ${
                isActive("/dashboard")
                  ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg"
                  : "bg-slate-900/40 text-gray-300 hover:bg-slate-800/60"
              }
            `}
          >
            <LayoutDashboardIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <div className="ml-3">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox:
                    "ring-2 ring-purple-500/50 hover:ring-cyan-400 transition-all",
                },
              }}
            />
          </div>

        </div>
      </div>
    </nav>
  );
}
