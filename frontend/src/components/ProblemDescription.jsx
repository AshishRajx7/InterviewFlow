import { getDifficultyBadgeClass } from "../lib/utils";
import { BookOpen, ListChecks, Lightbulb, ChevronRight } from "lucide-react";

export default function ProblemDescription({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems,
}) {
  return (
    <div className="h-full overflow-y-auto bg-slate-900/40 backdrop-blur-xl border-r border-purple-500/20">
      {/* HEADER SECTION */}
      <div className="p-6 border-b border-purple-500/20 bg-slate-900/60 backdrop-blur-xl shadow-lg">
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-md">
            {problem.title}
          </h1>

          <span
            className={`px-3 py-1 rounded-lg text-xs font-bold shadow-md ${
              getDifficultyBadgeClass(problem.difficulty)
            }`}
          >
            {problem.difficulty}
          </span>
        </div>

        <p className="text-gray-300">{problem.category}</p>

        {/* Problem Selector */}
        <div className="mt-5">
          <select
            className="w-full px-3 py-2 bg-slate-800/50 text-gray-200 rounded-lg border border-purple-500/30 focus:outline-none focus:border-cyan-400 transition-all"
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
          >
            {allProblems.map((p) => (
              <option
                key={p.id}
                value={p.id}
                className="bg-slate-900 text-gray-200"
              >
                {p.title} — {p.difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-6">

        {/* DESCRIPTION SECTION */}
        <section className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 shadow-xl hover:shadow-purple-500/20 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-gray-100">Description</h2>
          </div>

          <p className="text-gray-300 leading-relaxed">
            {problem.description.text}
          </p>

          {problem.description.notes.map((note, idx) => (
            <p key={idx} className="text-gray-400 leading-relaxed mt-2">
              <span className="text-cyan-400 font-semibold">Note:</span> {note}
            </p>
          ))}
        </section>

        {/* EXAMPLES SECTION */}
        <section className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 shadow-xl hover:shadow-cyan-500/20 transition-all">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-gray-100">Examples</h2>
          </div>

          <div className="space-y-6">
            {problem.examples.map((example, idx) => (
              <div
                key={idx}
                className="bg-slate-800/40 border border-cyan-500/30 rounded-lg p-4 hover:bg-slate-800/60 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-md text-xs font-semibold">
                    Example {idx + 1}
                  </span>
                </div>

                <div className="font-mono text-sm space-y-2">
                  <div className="flex gap-2">
                    <span className="text-purple-300 font-semibold w-16">Input:</span>
                    <span className="text-gray-200">{example.input}</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-cyan-300 font-semibold w-16">Output:</span>
                    <span className="text-gray-200">{example.output}</span>
                  </div>

                  {example.explanation && (
                    <div className="mt-3 border-t border-gray-600/40 pt-2">
                      <p className="text-gray-400 text-sm leading-relaxed">
                        <span className="text-purple-300 font-semibold">Explanation:</span>{" "}
                        {example.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONSTRAINTS SECTION */}
        <section className="bg-slate-900/50 backdrop-blur-xl border border-pink-500/20 rounded-xl p-6 shadow-xl hover:shadow-pink-500/20 transition-all">
          <div className="flex items-center gap-2 mb-4">
            <ListChecks className="w-5 h-5 text-pink-400" />
            <h2 className="text-xl font-bold text-gray-100">Constraints</h2>
          </div>

          <ul className="space-y-2 text-gray-300">
            {problem.constraints.map((constraint, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <ChevronRight className="w-4 h-4 text-pink-400 mt-1" />
                <code className="text-sm">{constraint}</code>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}
