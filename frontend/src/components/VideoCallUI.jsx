import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import {
  Loader2,
  MessageSquare,
  Users,
  X,
} from "lucide-react";

import { Chat, Channel, Window, MessageList, MessageInput, Thread } from "stream-chat-react";
import { useState } from "react";

export default function VideoCallUI({ chatClient, channel }) {
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participants = useParticipantCount();

  const [chatOpen, setChatOpen] = useState(false);

  if (callingState === CallingState.JOINING) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-purple-400" />
      </div>
    );
  }

  return (
    <div className="h-full flex gap-4 overflow-hidden">

      {/* LEFT SIDE: VIDEO */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">

        {/* HEADER */}
        <div className="flex items-center justify-between bg-slate-800/50 backdrop-blur-md p-3 rounded-lg">
          <div className="flex items-center gap-2 text-gray-300">
            <Users className="w-4 h-4 text-purple-300" />
            {participants} Participants
          </div>

          {chatClient && channel && (
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className={`btn btn-xs ${chatOpen ? "btn-primary" : "btn-ghost"}`}
            >
              <MessageSquare className="w-4 h-4" /> Chat
            </button>
          )}
        </div>

        {/* VIDEO LAYOUT */}
        <div className="flex-1 rounded-xl overflow-hidden bg-slate-900/60 border border-white/10">
          {/* IMPORTANT FIX */}
          <div className="str-video__call-container h-full w-full">
            <SpeakerLayout />
          </div>
        </div>

        {/* CONTROLS */}
        <div className="bg-slate-800/50 backdrop-blur-md p-3 rounded-lg flex justify-center">
          <CallControls />
        </div>
      </div>

      {/* RIGHT SIDE: CHAT */}
      {chatClient && channel && (
        <div
          className={`rounded-xl bg-slate-900/70 border border-white/10 transition-all duration-300 overflow-hidden
          ${chatOpen ? "w-80 opacity-100" : "w-0 opacity-0"}`}
        >
          {chatOpen && (
            <>
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-white/10">
                <h2 className="text-white font-semibold text-sm">Session Chat</h2>
                <button onClick={() => setChatOpen(false)}>
                  <X className="w-4 h-4 text-gray-300" />
                </button>
              </div>

              <div className="h-[calc(100%-48px)] stream-chat-dark">
                <Chat client={chatClient} theme="str-chat__theme-dark">
                  <Channel channel={channel}>
                    <Window>
                      <MessageList />
                      <MessageInput />
                    </Window>
                    <Thread />
                  </Channel>
                </Chat>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
