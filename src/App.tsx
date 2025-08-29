import React, { useState, useEffect } from "react";
import BMICalculator from "./components/BMICalculator";
import CalorieCalculator from "./components/CalorieCalculator";
import WaterTracker from "./components/WaterTracker";
import HeartRateZones from "./components/HeartRateZones";
import BodyFatCalculator from "./components/BodyFatCalculator";
import GrowthChart from "./components/GrowthChart";
import ImmunizationSchedule from "./components/ImmunizationSchedule";
import WHOBMIChart from "./components/WHOBMIChart";
import BloodPressureTracker from "./components/BloodPressureTracker";
import DiabetesRiskCalculator from "./components/DiabetesRiskCalculator";
import NutritionTracker from "./components/NutritionTracker";
import SleepTracker from "./components/SleepTracker";

function App() {
  const [active, setActive] = useState("bmi");

  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
  }, []);

  const tools = [
    { id: "bmi", name: "BMI Calculator", icon: "📊" },
    { id: "calorie", name: "Calorie Needs", icon: "🔥" },
    { id: "water", name: "Water Tracker", icon: "💧" },
    { id: "heartrate", name: "Heart Rate Zones", icon: "❤️" },
    { id: "bodyfat", name: "Body Fat", icon: "📏" },
    { id: "growth", name: "Growth Chart", icon: "📈" },
    { id: "immunization", name: "Immunization Schedule", icon: "�" },
    { id: "who-bmi", name: "WHO BMI Chart", icon: "🌍" },
    { id: "bloodpressure", name: "Blood Pressure", icon: "🩺" },
    { id: "diabetes", name: "Diabetes Risk", icon: "🩸" },
    { id: "nutrition", name: "Nutrition Tracker", icon: "🥗" },
    { id: "sleep", name: "Sleep Tracker", icon: "😴" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex justify-center items-center mb-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent mb-3">
              Health Tools
            </h1>
            <p className="text-gray-300 text-lg">
              WHO Standard Health Metrics & Indian Healthcare Tools
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-8">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`p-4 rounded-xl font-medium transition-all duration-300 flex flex-col items-center gap-2 ${
                active === tool.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-105 border border-blue-500/50"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 shadow-lg hover:shadow-xl border border-gray-700/50 hover:border-gray-600/50 backdrop-blur-sm"
              }`}
              onClick={() => setActive(tool.id)}
            >
              <span className="text-2xl">{tool.icon}</span>
              <span className="text-sm text-center leading-tight">{tool.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
          <div className="p-8">
            {active === "bmi" && <BMICalculator />}
            {active === "calorie" && <CalorieCalculator />}
            {active === "water" && <WaterTracker />}
            {active === "heartrate" && <HeartRateZones />}
            {active === "bodyfat" && <BodyFatCalculator />}
            {active === "growth" && <GrowthChart />}
            {active === "immunization" && <ImmunizationSchedule />}
            {active === "who-bmi" && <WHOBMIChart />}
            {active === "bloodpressure" && <BloodPressureTracker />}
            {active === "diabetes" && <DiabetesRiskCalculator />}
            {active === "nutrition" && <NutritionTracker />}
            {active === "sleep" && <SleepTracker />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
