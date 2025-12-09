import { Code2, Clock, Users, Trophy, Loader } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 
                    hover:border-cyan-500/30 shadow-lg shadow-cyan-500/10 transition-all duration-300 mt-10">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-40 rounded-xl" />
          <div className="relative p-2 bg-cyan-500/20 rounded-xl border border-cyan-500/30">
            <Clock className="w-5 h-5 text-cyan-300" />
          </div>
        </div>

        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
          Your Past Sessions
        </h2>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-20">
            <Loader className="w-10 h-10 animate-spin text-cyan-400" />
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div
              key={session._id}
              className="relative bg-slate-800/40 backdrop-blur-xl rounded-2xl p-5 border border-purple-500/10
                         hover:border-purple-400/40 hover:shadow-md hover:shadow-purple-600/20 transition-all duration-300"
            >
              {/* ACTIVE Badge */}
              {session.status === "active" && (
                <div className="absolute top-3 right-3">
                  <div className="px-3 py-1 rounded-xl bg-green-600/20 text-green-300 text-xs font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    ACTIVE
                  </div>
                </div>
              )}

              {/* Icon + Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <div
                    className={`absolute inset-0 blur-xl opacity-40 rounded-xl ${
                      session.status === "active"
                        ? "bg-green-500"
                        : "bg-purple-600"
                    }`}
                  />

                  <div
                    className={`relative w-12 h-12 rounded-xl flex items-center justify-center 
                    ${
                      session.status === "active"
                        ? "bg-green-600/30 border border-green-400/30"
                        : "bg-gradient-to-br from-purple-700 to-cyan-700 border border-purple-500/20"
                    }`}
                  >
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg truncate">{session.problem}</h3>

                  <span
                    className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-lg ${getDifficultyBadgeClass(
                      session.difficulty
                    )}`}
                  >
                    {session.difficulty}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-300 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-300" />
                  <span>
                    {formatDistanceToNow(new Date(session.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-300" />
                  <span>
                    {session.participant ? "2" : "1"} participant
                    {session.participant ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-700/40">
                <span className="text-xs font-semibold text-gray-400 uppercase">Completed</span>
                <span className="text-xs text-gray-500">
                  {new Date(session.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-600/20 to-purple-600/20 
                            rounded-3xl flex items-center justify-center border border-purple-500/10">
              <Trophy className="w-12 h-12 text-cyan-300" />
            </div>

            <p className="text-lg font-semibold text-gray-300">No sessions yet</p>
            <p className="text-sm text-gray-500">Start your coding journey today!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentSessions;
