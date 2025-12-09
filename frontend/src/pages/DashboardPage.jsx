import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from "../hooks/useSessions";

import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";

import { Code2, Sparkles } from "lucide-react";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({
    problem: "",
    difficulty: "",
  });

  const createSessionMutation = useCreateSession();

  const { data: activeSessionsData, isLoading: loadingActiveSessions } =
    useActiveSessions();

  const { data: recentSessionsData, isLoading: loadingRecentSessions } =
    useMyRecentSessions();

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const isUserInSession = (session) => {
    if (!user?.id) return false;
    return (
      session.host?.clerkId === user.id ||
      session.participant?.clerkId === user.id
    );
  };

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          navigate(`/session/${data.session._id}`);
        },
      }
    );
  };

  return (
    <>
      {/* PAGE BACKGROUND */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-900 text-white overflow-hidden">

        {/* Glowing Background Balls */}
        <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 top-[-10%] left-[10%]" />
        <div className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 bottom-[-10%] right-[10%]" />

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* NAVBAR */}
        <Navbar />

        {/* HEADER */}
        <div className="container mx-auto px-6 pt-10 relative z-10">
          <div className="flex items-center gap-4">
            {/* Icon Glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 blur-xl rounded-xl opacity-40" />
              <Code2 className="w-12 h-12 relative text-white drop-shadow-lg" />
            </div>

            {/* Greeting */}
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow">
                Welcome Back, {user?.firstName || "Developer"}!
              </h1>

              <p className="text-gray-300 text-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Continue your interview journey and level up your skills.
              </p>
            </div>
          </div>

          {/* CREATE SESSION BUTTON */}
          <div className="mt-8">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-8 py-4 rounded-xl font-bold text-lg
                bg-gradient-to-r from-purple-600 to-cyan-600 
                hover:shadow-2xl hover:shadow-purple-500/40 
                hover:scale-105 active:scale-95 
                transition-all flex items-center gap-3"
            >
              <Sparkles className="w-5 h-5 text-white" />
              Create New Session
            </button>
          </div>
        </div>

        {/* DASHBOARD CONTENT */}
        <div className="container mx-auto px-6 pb-20 pt-12 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Stats */}
            <div className="lg:col-span-1">
              <StatsCards
                activeSessionsCount={activeSessions.length}
                recentSessionsCount={recentSessions.length}
              />
            </div>

            {/* Active Sessions */}
            <div className="lg:col-span-2">
              <ActiveSessions
                sessions={activeSessions}
                isLoading={loadingActiveSessions}
                isUserInSession={isUserInSession}
              />
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="mt-10">
            <RecentSessions
              sessions={recentSessions}
              isLoading={loadingRecentSessions}
            />
          </div>
        </div>
      </div>

      {/* CREATE SESSION MODAL */}
      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
}

export default DashboardPage;
