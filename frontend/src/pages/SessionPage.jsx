import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";

import Navbar from "../components/Navbar";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";

import {
  Loader2Icon,
  LogOutIcon,
  PhoneOffIcon,
  UsersIcon,
  Code2,
  UserPlus,
} from "lucide-react";

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

/**
 * SessionPage
 * - Keeps all existing behavior (auto-join, run code, end session)
 * - Provides a full-page polished UI with large header, sticky controls, and roomy panels.
 *
 * Notes:
 * - We intentionally keep the existing hooks/mutations & join logic unchanged.
 * - ESLint: `void output;` is used to mark output intentionally unused in some branches.
 */

export default function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();

  const [output, setOutput] = useState(null);
  void output; // keep linter happy where output might be unused in certain builds
  const [isRunning, setIsRunning] = useState(false);

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);
  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const {
    call,
    channel,
    chatClient,
    isInitializingCall,
    streamClient,
  } = useStreamClient(session, loadingSession, isHost, isParticipant);

  // find the problem data based on session problem title
  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(problemData?.starterCode?.[selectedLanguage] || "");

  // Auto join logic — run once per session load (keep refetch callback)
  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;

    joinSessionMutation.mutate(id, {
      onSuccess: () => {
        refetch();
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  // Redirect participant after session completion
  useEffect(() => {
    if (session && session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  // Update code when problem loads or language changes
  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(problemData?.starterCode?.[newLang] || "");
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    try {
      const result = await executeCode(selectedLanguage, code);
      setOutput(result);
    } catch (err) {
      setOutput({ success: false, output: "", error: String(err) });
    } finally {
      setIsRunning(false);
    }
  };

  const handleEndSession = () => {
    if (confirm("End this session for everyone?")) {
      endSessionMutation.mutate(id, { onSuccess: () => navigate("/dashboard") });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 -top-24 w-96 h-96 bg-purple-800/30 rounded-full blur-3xl animate-[pulse_6s_infinite]" />
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-cyan-800/30 rounded-full blur-3xl animate-[pulse_8s_infinite]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <Navbar />

      {/* Top session header (sticky) */}
      <header className="sticky top-16 z-40 bg-transparent backdrop-blur-md px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {session?.problem || "Loading session..."}
                </h2>
                <div className="text-sm text-gray-300">
                  <span className="inline-flex items-center gap-2 mr-4">
                    <UsersIcon className="w-4 h-4 text-purple-300" />
                    Host: <span className="font-medium ml-1">{session?.host?.name || "-"}</span>
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <span className={`badge ${getDifficultyBadgeClass(session?.difficulty)}`}>
                      {session?.difficulty ?? "easy"}
                    </span>
                    <span className="ml-2 text-sm text-gray-400">
                      {session?.participant ? "2/2 participants" : "1/2 participants"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* End session for host */}
            {isHost && session?.status === "active" && (
              <button
                className="btn btn-error btn-sm gap-2"
                onClick={handleEndSession}
                disabled={endSessionMutation.isPending}
                title="End session for everyone"
              >
                {endSessionMutation.isPending ? (
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                ) : (
                  <LogOutIcon className="w-4 h-4" />
                )}
                End Session
              </button>
            )}

            {/* Join indicator / placeholder for guest */}
            {!isHost && !isParticipant && (
              <button
                className="btn btn-ghost btn-sm gap-2"
                onClick={() => {
                  joinSessionMutation.mutate(id, { onSuccess: refetch });
                }}
                title="Join session"
              >
                <UserPlus className="w-4 h-4" />
                Join
              </button>
            )}

            {/* Quick run button */}
            <button
              className="btn btn-primary btn-sm"
              onClick={handleRunCode}
              disabled={isRunning}
              title="Run current code"
            >
              {isRunning ? (
                <>
                  <Loader2Icon className="w-4 h-4 animate-spin" /> Running...
                </>
              ) : (
                "Run Code"
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main content area - full width panels */}
      <main className="max-w-[1400px] mx-auto px-6 pb-8 pt-6">
        <div className="h-[calc(100vh-160px)]">
          <PanelGroup direction="horizontal">
            {/* Left column: Problem description + editor */}
            <Panel defaultSize={55} minSize={30}>
              <div className="h-full flex flex-col gap-4">
                {/* Problem + meta (top half) */}
                <div className="h-1/2 bg-slate-800/50 border border-purple-600/20 rounded-xl p-5 overflow-auto shadow-md">
                  <h3 className="text-xl font-semibold mb-3">Problem</h3>
                  <p className="text-gray-300 mb-4">{problemData?.description?.text}</p>

                  {problemData?.description?.notes?.length > 0 && (
                    <div className="mb-4">
                      {problemData.description.notes.map((n, i) => (
                        <div key={i} className="text-sm text-gray-400 mb-1">
                          • {n}
                        </div>
                      ))}
                    </div>
                  )}

                  {problemData?.examples?.length > 0 && (
                    <div className="space-y-3 mt-3">
                      <h4 className="font-semibold text-gray-200">Examples</h4>
                      {problemData.examples.map((ex, idx) => (
                        <div key={idx} className="bg-slate-900/50 rounded p-3 font-mono text-sm">
                          <div>
                            <span className="text-cyan-300">Input:</span> {ex.input}
                          </div>
                          <div>
                            <span className="text-purple-300">Output:</span> {ex.output}
                          </div>
                          {ex.explanation && (
                            <div className="text-xs text-gray-400 mt-2">{ex.explanation}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {problemData?.constraints && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-200">Constraints</h4>
                      <ul className="text-sm text-gray-400 list-disc list-inside mt-2">
                        {problemData.constraints.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Editor (bottom half) */}
                <div className="h-1/2 bg-slate-800/60 border border-cyan-500/20 rounded-xl overflow-hidden shadow-md">
                  <CodeEditorPanel
                    selectedLanguage={selectedLanguage}
                    code={code}
                    isRunning={isRunning}
                    onLanguageChange={handleLanguageChange}
                    onCodeChange={(val) => setCode(val)}
                    onRunCode={handleRunCode}
                  />
                </div>
              </div>
            </Panel>

            <PanelResizeHandle className="w-2 bg-purple-600/30 hover:bg-purple-500/60 cursor-col-resize" />

            {/* Right column: Video call (top) + Output (bottom as overlay) */}
            <Panel defaultSize={45} minSize={30}>
              <div className="h-full flex flex-col gap-4">
                <div className="flex-1 bg-slate-800/50 border border-purple-500/20 rounded-xl p-3 overflow-hidden">
                  {isInitializingCall ? (
                    <div className="h-full flex flex-col items-center justify-center gap-4">
                      <Loader2Icon className="w-12 h-12 text-purple-400 animate-spin" />
                      <div className="text-gray-300">Connecting to video...</div>
                    </div>
                  ) : !streamClient || !call ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4">
                          <PhoneOffIcon className="w-12 h-12 text-red-400" />
                        </div>
                        <h3 className="text-lg font-semibold">Connection Failed</h3>
                        <p className="text-gray-400">Unable to connect to the video call</p>
                      </div>
                    </div>
                  ) : (
                    <StreamVideo client={streamClient} className="h-full">
                      <StreamCall call={call}>
                        <VideoCallUI chatClient={chatClient} channel={channel} />
                      </StreamCall>
                    </StreamVideo>
                  )}
                </div>

                {/* Output panel (small, fixed height) */}
                <div className="h-56 bg-slate-800/60 border border-pink-500/20 rounded-xl overflow-hidden">
                  <OutputPanel output={output} />
                </div>
              </div>
            </Panel>
          </PanelGroup>
        </div>
      </main>
    </div>
  );
}
