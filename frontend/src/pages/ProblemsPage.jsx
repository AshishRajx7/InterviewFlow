import { Link } from "react-router";
import Navbar from "../components/Navbar";

import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

export default function ProblemsPage() {
  const problems = Object.values(PROBLEMS);

  const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
  const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white relative overflow-hidden">

      {/* Glowing Background Orbs */}
      <div className="absolute top-20 left-32 w-96 h-96 bg-purple-600 blur-3xl opacity-20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-32 w-96 h-96 bg-cyan-600 blur-3xl opacity-20 rounded-full animate-pulse"></div>

      {/* Subtle Grid Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(168,85,247,0.15) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(168,85,247,0.15) 1px, transparent 1px)`,
          backgroundSize: "45px 45px",
        }}
      />

      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Practice Problems
          </h1>
          <p className="text-gray-300 mt-2 text-lg">
            Sharpen your skills with our curated coding challenges
          </p>
        </div>

        {/* PROBLEM LIST */}
        <div className="space-y-5">
          {problems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="block rounded-2xl backdrop-blur-xl bg-slate-900/40 border border-purple-500/20 hover:border-cyan-400/40 transition-all shadow-xl hover:scale-[1.015]"
            >
              <div className="p-6">

                <div className="flex items-center justify-between gap-4">

                  {/* LEFT SIDE */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">

                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/40 to-cyan-600/40 flex items-center justify-center shadow-lg">
                        <Code2Icon className="size-7 text-cyan-300" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-bold">{problem.title}</h2>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyBadgeClass(
                              problem.difficulty
                            )}`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>

                        <p className="text-gray-400 text-sm mt-1">{problem.category}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-base leading-relaxed">
                      {problem.description.text}
                    </p>
                  </div>

                  {/* RIGHT SIDE BUTTON */}
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold text-lg hover:text-cyan-300 transition">
                    Solve
                    <ChevronRightIcon className="size-5" />
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* STATS FOOTER */}
        <div className="mt-14 rounded-2xl backdrop-blur-xl bg-slate-900/40 border border-purple-500/20 shadow-xl p-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">

            <div>
              <div className="text-gray-400 text-sm">Total Problems</div>
              <div className="text-3xl font-bold text-purple-400">{problems.length}</div>
            </div>

            <div>
              <div className="text-gray-400 text-sm">Easy</div>
              <div className="text-3xl font-bold text-green-400">{easyProblemsCount}</div>
            </div>

            <div>
              <div className="text-gray-400 text-sm">Medium</div>
              <div className="text-3xl font-bold text-yellow-400">{mediumProblemsCount}</div>
            </div>

            <div>
              <div className="text-gray-400 text-sm">Hard</div>
              <div className="text-3xl font-bold text-red-400">{hardProblemsCount}</div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
