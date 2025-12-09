import { useUser } from "@clerk/clerk-react";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative py-14 px-6">
      
      {/* Soft glowing background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-purple-400/5 to-cyan-500/10 blur-2xl opacity-40 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        
        {/* Left: Greeting Section */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            {/* Icon Glow Box */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 blur-xl rounded-2xl opacity-40" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-700 to-cyan-700 flex items-center justify-center border border-purple-500/30 shadow-lg shadow-purple-500/20">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow">
              Welcome back, {user?.firstName || "Developer"}!
            </h1>
          </div>

          <p className="text-lg md:text-xl text-gray-300 ml-1">
            Ready to level up your interviewing and coding skills?
          </p>
        </div>

        {/* Right: Create Session Button */}
        <button
          onClick={onCreateSession}
          className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl shadow-lg shadow-purple-600/20 hover:scale-[1.03] transition-all duration-300"
        >
          <div className="flex items-center gap-3 text-white font-bold text-lg">
            <Zap className="w-6 h-6" />
            <span>Create Session</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

      </div>
    </div>
  );
}

export default WelcomeSection;
