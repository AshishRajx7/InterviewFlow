import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

export default function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  return (
    <div className="h-full flex flex-col bg-slate-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl shadow-xl relative overflow-hidden">

      {/* Glow Underlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 blur-3xl opacity-10 pointer-events-none" />

      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-900/60 backdrop-blur-xl border-b border-purple-500/20 rounded-t-xl shadow-lg">

        {/* LANGUAGE SELECTOR */}
        <div className="flex items-center gap-3">
          <img
            src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            className="w-6 h-6 drop-shadow-md"
          />

          <select
            className="px-3 py-1.5 bg-slate-800/50 text-gray-200 rounded-lg border border-purple-500/30 focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
            value={selectedLanguage}
            onChange={onLanguageChange}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key} className="bg-slate-900 text-gray-200">
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* RUN CODE BUTTON */}
        <button
          disabled={isRunning}
          onClick={onRunCode}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-md
            ${
              isRunning
                ? "bg-slate-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:scale-105 hover:shadow-purple-500/40 active:scale-95"
            }
          `}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="w-4 h-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <PlayIcon className="w-4 h-4" />
              Run Code
            </>
          )}
        </button>
      </div>

      {/* MONACO EDITOR */}
      <div className="flex-1 border-t border-slate-700/40">
        <Editor
          height="100%"
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 16,
            fontFamily: "JetBrains Mono, monospace",
            minimap: { enabled: true },
            smoothScrolling: true,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            roundedSelection: false,
            automaticLayout: true,
            cursorBlinking: "smooth",
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>
    </div>
  );
}
