import axiosInstance from "../lib/axios";

export const sessionApi = {
  createSession: async (data) => {
    return axiosInstance.post("/api/sessions/create", data);
  },

  getActiveSessions: async () => {
    return axiosInstance.get("/api/sessions/active");
  },

  getMyRecentSessions: async () => {
    return axiosInstance.get("/api/sessions/my-recent");
  },

  getSessionById: async (id) => {
    return axiosInstance.get(`/api/sessions/${id}`);
  },

  joinSession: async (id) => {
    return axiosInstance.post(`/api/sessions/${id}/join`);
  },

  endSession: async (id) => {
    return axiosInstance.post(`/api/sessions/${id}/end`);
  },

  getStreamToken: async () => {
    return axiosInstance.get(`/api/chat/token`);
  },
};
