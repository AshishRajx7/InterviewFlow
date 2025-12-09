import { useEffect, useState } from "react";
import { SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";

import {
  ArrowRight,
  Code2,
  Sparkles,
  Users,
  Video,
  Zap,
  Terminal,
  Braces,
  GitBranch,
} from "lucide-react";

// Floating elements
const codeSnippets = [
  "const code = 'together';",
  "function collaborate() {}",
  "if (talent) return true;",
  "while (learning) grow();",
  "class Developer {}",
  "=> async magic",
  "export default App;",
  "git commit -m 'win'",
];

const floatingIcons = [
  { icon: Code2, delay: 0, duration: 20 },
  { icon: Terminal, delay: 2, duration: 25 },
  { icon: Braces, delay: 4, duration: 22 },
  { icon: GitBranch, delay: 1, duration: 23 },
  { icon: Zap, delay: 3, duration: 21 },
];

function FloatingElement({ children, delay, duration, index }) {
  return (
    <div
      className="absolute pointer-events-none opacity-10"
      style={{
        left: `${(index * 20 + 10) % 90}%`,
        top: `${(index * 30 + 5) % 80}%`,
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden relative">

      {/* Animated glowing orbs */}
      <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ top: "10%", left: "20%", animationDuration: "4s" }} />
      <div className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ bottom: "10%", right: "20%", animationDuration: "6s" }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }} />

      {/* Floating Code Snippets */}
      {codeSnippets.map((snippet, i) => (
        <FloatingElement key={i} delay={i * 0.5} duration={20 + i} index={i}>
          <div className="text-cyan-400 font-mono text-xs md:text-sm font-bold px-4 py-2 bg-slate-900/30 rounded-lg backdrop-blur-sm border border-cyan-500/20">
            {snippet}
          </div>
        </FloatingElement>
      ))}

      {/* Floating Icons */}
      {floatingIcons.map((item, i) => {
        const Icon = item.icon;
        return (
          <FloatingElement
            key={`icon-${i}`}
            delay={item.delay}
            duration={item.duration}
            index={i + 10}
          >
            <Icon className="w-8 h-8 md:w-12 md:h-12 text-purple-400" />
          </FloatingElement>
        );
      })}

      {/* Mouse follower glow */}
      <div
        className="fixed w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10 pointer-events-none transition-all duration-1000 ease-out"
        style={{ left: mousePos.x - 192, top: mousePos.y - 192 }}
      />

      {/* Custom float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(5deg); }
          66% { transform: translateY(30px) rotate(-5deg); }
        }
      `}</style>

      <div className="relative z-10">

        {/* NAVBAR */}
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between backdrop-blur-md bg-slate-900/30 px-6 py-4 rounded-2xl border border-purple-500/20 shadow-lg">

            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg blur-md group-hover:blur-xl transition-all" />
                <Code2 className="w-8 h-8 text-white relative animate-pulse" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                InterviewFlow
              </span>
            </a>

            <SignInButton mode="modal">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold hover:scale-105 transition-all">
                Get Started
              </button>
            </SignInButton>

          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT SIDE */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-sm font-medium text-purple-300">
                  Real-time Collaboration
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Code Together,
                </span>
                <br />
                <span className="text-white">Learn Faster</span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                A clean and powerful platform for mock interviews, collaborative coding,
                and real-time pair programming.{" "}
                <span className="text-cyan-400 font-semibold">Simple.</span>{" "}
                <span className="text-purple-400 font-semibold">Productive.</span>{" "}
                <span className="text-pink-400 font-semibold">Effective.</span>
              </p>

              {/* FEATURES TAGS */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Video, text: "HD Video Chat", color: "purple" },
                  { icon: Code2, text: "Live Code Editor", color: "cyan" },
                  { icon: Zap, text: "Multi-Language", color: "pink" },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-sm hover:scale-105 transition-all cursor-pointer ${
                        item.color === "purple"
                          ? "bg-purple-500/10 border border-purple-500/30"
                          : item.color === "cyan"
                          ? "bg-cyan-500/10 border border-cyan-500/30"
                          : "bg-pink-500/10 border border-pink-500/30"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          item.color === "purple"
                            ? "text-purple-400"
                            : item.color === "cyan"
                            ? "text-cyan-400"
                            : "text-pink-400"
                        }`}
                      />
                      <span className="text-sm text-gray-200">{item.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4">

                {/* START CODING BUTTON — FIXED */}
                {isSignedIn ? (
                  <button
                    onClick={() => navigate("/problems")}
                    className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold text-lg hover:scale-105 transition-all"
                  >
                    Start Coding
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <SignInButton mode="modal">
                    <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold text-lg hover:scale-105 transition-all">
                      Start Coding
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </SignInButton>
                )}

                <button className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all hover:scale-105 flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { value: "50+", label: "Active Users", color: "purple" },
                  { value: "100+", label: "Sessions", color: "cyan" },
                  { value: "99.9%", label: "Uptime", color: "pink" },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div
                      className={`text-3xl font-bold ${
                        stat.color === "purple"
                          ? "text-purple-400"
                          : stat.color === "cyan"
                          ? "text-cyan-400"
                          : "text-pink-400"
                      }`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE MOCK EDITOR */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-all" />
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-purple-500/30 shadow-2xl">

                {/* Mock Code Editor */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>

                  {[
                    { text: "function collaborate() {", indent: 0, color: "purple" },
                    { text: "const magic = true;", indent: 2, color: "cyan" },
                    { text: "return magic;", indent: 2, color: "pink" },
                    { text: "}", indent: 0, color: "purple" },
                  ].map((line, i) => (
                    <div
                      key={i}
                      className="font-mono text-sm"
                      style={{ paddingLeft: `${line.indent}rem` }}
                    >
                      <span
                        className={
                          line.color === "purple"
                            ? "text-purple-400"
                            : line.color === "cyan"
                            ? "text-cyan-400"
                            : "text-pink-400"
                        }
                      >
                        {line.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Avatars */}
                <div className="flex -space-x-4 mt-8">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 border-4 border-slate-900"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Tools Built for{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Success
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to run smooth and effective coding interviews.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Video, title: "High-quality Video", desc: "Clear communication with low-latency calls.", color: "purple" },
              { icon: Code2, title: "Smart Editor", desc: "Live collaboration with syntax highlighting.", color: "cyan" },
              { icon: Users, title: "Pair Programming", desc: "Work together and learn faster.", color: "pink" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 transition-all ${
                    item.color === "purple"
                      ? "border border-purple-500/20 hover:border-purple-500/50"
                      : item.color === "cyan"
                      ? "border border-cyan-500/20 hover:border-cyan-500/50"
                      : "border border-pink-500/20 hover:border-pink-500/50"
                  }`}
                >
                  <div className="relative">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
                        item.color === "purple"
                          ? "bg-purple-600"
                          : item.color === "cyan"
                          ? "bg-cyan-600"
                          : "bg-pink-600"
                      }`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="container mx-auto px-6 py-20">
          <div className="relative bg-gradient-to-r from-purple-900/50 to-cyan-900/50 backdrop-blur-sm rounded-3xl p-12 md:p-16 border border-purple-500/30">
            <div className="relative text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to improve your interview skills?
              </h2>
              <p className="text-xl text-gray-300">
                Join thousands of developers leveling up every day.
              </p>

              <SignUpButton mode="modal">
                <button className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold text-lg hover:scale-110 transition-all flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </SignUpButton>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
