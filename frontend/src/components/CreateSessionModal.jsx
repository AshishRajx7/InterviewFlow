import { Code2, Loader, Plus } from "lucide-react";
import { PROBLEMS } from "../data/problems";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-2xl bg-slate-900/50 backdrop-blur-xl 
                      rounded-2xl border border-purple-500/20 shadow-xl shadow-purple-700/20
                      p-8 z-50 animate-fadeIn">

        {/* TITLE */}
        <h3 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-purple-300 to-cyan-300 
                       bg-clip-text text-transparent">
          Create New Session
        </h3>

        <div className="space-y-8">

          {/* PROBLEM SELECT */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300 flex items-center gap-1">
              Select Problem
              <span className="text-red-400">*</span>
            </label>

            <select
              className="w-full p-3 rounded-xl bg-slate-800/50 border border-purple-500/20 
                         text-gray-200 focus:outline-none focus:border-purple-400 transition-all"
              value={roomConfig.problem}
              onChange={(e) => {
                const selectedProblem = problems.find((p) => p.title === e.target.value);
                setRoomConfig({
                  difficulty: selectedProblem.difficulty,
                  problem: e.target.value,
                });
              }}
            >
              <option value="" disabled>
                Choose a coding problem…
              </option>

              {problems.map((problem) => (
                <option key={problem.id} value={problem.title}>
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* ROOM SUMMARY */}
          {roomConfig.problem && (
            <div className="flex gap-4 p-4 rounded-xl bg-green-600/15 border border-green-400/20">
              <div className="p-3 rounded-xl bg-green-500/20 border border-green-400/30">
                <Code2 className="w-6 h-6 text-green-300" />
              </div>

              <div>
                <p className="font-semibold text-green-300 mb-1">Room Summary:</p>
                <p className="text-gray-200">
                  Problem: <span className="font-medium">{roomConfig.problem}</span>
                </p>
                <p className="text-gray-200">
                  Max Participants:{" "}
                  <span className="font-medium">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER BUTTONS */}
        <div className="flex justify-end gap-3 mt-10">

          {/* CANCEL BUTTON */}
          <button
            className="px-5 py-2 rounded-xl bg-slate-700/40 text-gray-300 
                       hover:bg-slate-700/60 transition-all"
            onClick={onClose}
          >
            Cancel
          </button>

          {/* CREATE BUTTON */}
          <button
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 
                       rounded-xl text-white font-semibold flex items-center gap-2
                       hover:scale-105 transition-all disabled:opacity-50"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
          >
            {isCreating ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}

export default CreateSessionModal;
