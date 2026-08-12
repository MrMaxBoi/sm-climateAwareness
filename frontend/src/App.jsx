import { lazy, Suspense, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import { LoadingState } from "./components/AsyncState";
import PrivacyBanner from "./components/PrivacyBanner";
import SiteFooter from "./components/SiteFooter";
import { api } from "./lib/api";

const LearnPage = lazy(() => import("./pages/LearnPage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const ActionsPage = lazy(() => import("./pages/ActionsPage"));
const ProgressPage = lazy(() => import("./pages/ProgressPage"));
const AssessmentPage = lazy(() => import("./pages/AssessmentPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const UpdateDetailPage = lazy(() => import("./pages/UpdateDetailPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const FeedbackPage = lazy(() => import("./pages/FeedbackPage"));

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const [consent, setConsent] = useState(() => window.localStorage.getItem("ecolearn-analytics-consent"));

  useEffect(() => {
    const visitKey = "ecolearn-visit-recorded";
    if (consent === "granted" && !window.sessionStorage.getItem(visitKey)) {
      api.recordVisit()
        .then(() => window.sessionStorage.setItem(visitKey, "true"))
        .catch(() => {});
    }
  }, [consent]);

  const chooseConsent = (choice) => {
    window.localStorage.setItem("ecolearn-analytics-consent", choice);
    setConsent(choice);
  };

  return (
    <Box minH="100vh" pb={{ base: "72px", md: 0 }}>
      {!isAdmin && <Navbar />}
      <Suspense fallback={<LoadingState label="Opening EcoLearn…" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/:slug" element={<UpdateDetailPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/actions" element={<ActionsPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      {!isAdmin && <SiteFooter />}
      {!isAdmin && <BottomNav />}
      {!isAdmin && !consent && <PrivacyBanner onChoose={chooseConsent} />}
    </Box>
  );
}

export default App
