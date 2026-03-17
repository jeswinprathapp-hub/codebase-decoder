import { useState, useCallback } from "react";
import { LandingHero } from "@/components/LandingHero";
import { AnalysisLoader } from "@/components/AnalysisLoader";
import { Dashboard } from "@/components/Dashboard";
import { sampleAnalysis } from "@/lib/mockData";

type View = "landing" | "loading" | "dashboard";

const Index = () => {
  const [view, setView] = useState<View>("landing");

  const handleAnalyze = useCallback(() => {
    setView("loading");
  }, []);

  const handleLoaded = useCallback(() => {
    setView("dashboard");
  }, []);

  if (view === "loading") return <AnalysisLoader onComplete={handleLoaded} />;
  if (view === "dashboard") return <Dashboard data={sampleAnalysis} onBack={() => setView("landing")} />;
  return <LandingHero onAnalyze={handleAnalyze} />;
};

export default Index;
