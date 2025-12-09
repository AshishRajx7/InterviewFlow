import {
  ArrowRight,
  Code2,
  Crown,
  Sparkles,
  Users,
  Zap,
  Loader,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 
                    hover:border-purple-500/30 transition-all duration-300 shadow-lg shadow-purple-500/10 h-full">

      {/* HEADER ROW */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          
          {/* Glow Icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-purple-600 blur-xl opacity-40 rounded-xl" />
            <div className="relative p-2 bg-purple-600/20 rounded-xl border border-purple-500/30">
              <Zap className="w-5 h-5 text-purple-300" />
            </div>
          </div>

          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
            Live Sessions
          </h2>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-green-400 font-semibold">{sessions.length} active</span>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader className="w-10 h-10 animate-spin text-purple-400" />
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div
              key={session._id}
              className="bg-slate-800/40 border border-purple-500/10 rounded-xl p-5
                         hover:border-purple-400/40 hover:shadow-md hover:shadow-purple-600/20 
                         transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-6">

                {/* Left Section */}
                <div className="flex items-center gap-5 flex-1">

                  {/* Icon with online dot */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl blur-lg opacity-30" />
                    <div className="relative size-14 rounded-xl bg-gradient-to-br from-purple-700 to-cyan-700 
                                    flex items-center justify-center border border-purple-500/20 shadow-lg">
                      <Code2 className="w-7 h-7 text-white" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900" />
                    </div>
                  </div>

                  {/* Session Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold truncate">{session.problem}</h3>

                      {/* Difficulty badge */}
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-bold ${getDifficultyBadgeClass(
                          session.difficulty
                        )}`}
                      >
                        {session.difficulty[0].toUpperCase() + session.difficulty.slice(1)}
                      </span>
                    </div>

                    {/* Session Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-300">

                      <div className="flex items-center gap-1.5">
                        <Crown className="w-4 h-4 text-yellow-400" />
                        <span className="font-medium">{session.host?.name}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-cyan-300" />
                        <span>{session.participant ? "2/2" : "1/2"}</span>
                      </div>

                      {session.participant && !isUserInSession(session) ? (
                        <span className="px-2 py-1 bg-red-600/30 text-red-300 rounded-lg text-xs font-bold">
                          FULL
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-green-600/20 text-green-300 rounded-lg text-xs font-bold">
                          OPEN
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side: Join / Rejoin button */}
                {session.participant && !isUserInSession(session) ? (
                  <button className="px-5 py-2 bg-slate-700/40 text-gray-500 rounded-lg cursor-not-allowed">
                    Full
                  </button>
                ) : (
                  <Link
                    to={`/session/${session._id}`}
                    className="group px-5 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 
                               rounded-lg font-semibold text-white flex items-center gap-2
                               hover:scale-105 transition-all duration-200"
                  >
                    {isUserInSession(session) ? "Rejoin" : "Join"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 
                            rounded-3xl flex items-center justify-center border border-purple-500/10">
              <Sparkles className="w-10 h-10 text-purple-300" />
            </div>
            <p className="text-lg font-semibold text-gray-300">No active sessions</p>
            <p className="text-sm text-gray-500">Be the first to create one!</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default ActiveSessions;
