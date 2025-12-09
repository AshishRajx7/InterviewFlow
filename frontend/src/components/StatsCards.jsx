import { Trophy, Users } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="lg:col-span-1 grid grid-cols-1 gap-6">

      {/* Active Sessions Card */}
      <div className="relative bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20
                      hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-600/20 transition-all duration-300">

        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          {/* Icon Glow Box */}
          <div className="relative">
            <div className="absolute inset-0 bg-purple-600 blur-xl opacity-30 rounded-2xl" />
            <div className="relative p-3 bg-purple-600/20 rounded-2xl border border-purple-500/20">
              <Users className="w-7 h-7 text-purple-300" />
            </div>
          </div>

          <div className="px-3 py-1 rounded-xl bg-purple-600/20 text-purple-300 text-xs font-bold">
            LIVE
          </div>
        </div>

        {/* Stats */}
        <div className="text-5xl font-extrabold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          {activeSessionsCount}
        </div>
        <p className="text-gray-400 mt-1 text-sm">Active Sessions</p>
      </div>

      {/* Total Sessions Card */}
      <div className="relative bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20
                      hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-600/20 transition-all duration-300">

        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          {/* Icon Glow Box */}
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-30 rounded-2xl" />
            <div className="relative p-3 bg-cyan-500/20 rounded-2xl border border-cyan-500/20">
              <Trophy className="w-7 h-7 text-cyan-300" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="text-5xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
          {recentSessionsCount}
        </div>
        <p className="text-gray-400 mt-1 text-sm">Total Sessions</p>
      </div>

    </div>
  );
}

export default StatsCards;
