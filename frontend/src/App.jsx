import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import ProblemsPage from "./pages/ProblemsPage.jsx";
import SessionPage from "./pages/SessionPage.jsx";

import { Toaster } from "react-hot-toast";

function App() {
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);
  }, []);

  if (!isLoaded) return null;

  return (
    <>
      <Routes>

        {/* Home is always public */}
        <Route path="/" element={<HomePage />} />

        {/* Dashboard protected */}
        <Route
          path="/dashboard"
          element={
            isSignedIn ? <DashboardPage /> : <Navigate to="/" />
          }
        />

        {/* Problems protected */}
        <Route
          path="/problems"
          element={
            isSignedIn ? <ProblemsPage /> : <Navigate to="/" />
          }
        />

        {/* Single problem protected */}
        <Route
          path="/problem/:id"
          element={
            isSignedIn ? <ProblemPage /> : <Navigate to="/" />
          }
        />

        {/* Session protected */}
        <Route
          path="/session/:id"
          element={
            isSignedIn ? <SessionPage /> : <Navigate to="/" />
          }
        />

      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
