import React, { useState } from "react";

const WaterTracker = () => {
  const [glasses, setGlasses] = useState(0);
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [recommendedWater, setRecommendedWater] = useState<number | null>(null);

  const calculateWaterNeeds = () => {
    if (weight) {
      const waterIntake = parseFloat(weight) * 35; // 35 ml per kg
      const activityMultiplier = {
        low: 1.2,
        moderate: 1.5,
        high: 1.8
      }[activityLevel] || 1.5;
      const recommended = (waterIntake * activityMultiplier) / 1000; // Convert ml to L
      setRecommendedWater(recommended);
    } else {
      setRecommendedWater(null);
    }
  };

  const dailyGoal = recommendedWater || 2.5; // Default to 2.5L if no weight is entered

  const addGlass = () => setGlasses(glasses + 1);
  const removeGlass = () => setGlasses(Math.max(0, glasses - 1));
  const reset = () => setGlasses(0);

  const percentage = Math.min((glasses / dailyGoal) * 100, 100);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Water Intake Tracker</h2>
        <p className="text-gray-300">Track your daily water consumption</p>
      </div>
      
      <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
            <input
              type="number"
              placeholder="Your weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Activity Level</label>
            <select 
              value={activityLevel} 
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low Activity</option>
              <option value="moderate">Moderate Activity</option>
              <option value="high">High Activity</option>
            </select>
          </div>
          <button 
            onClick={calculateWaterNeeds}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Calculate
          </button>
        </div>
      </div>
      
      {recommendedWater && (
        <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50 text-center">
          <div className="text-4xl font-bold text-blue-400 mb-2">{recommendedWater.toFixed(1)}L</div>
          <div className="text-lg text-gray-300">Recommended Daily Water Intake</div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Weight (lbs) - Optional
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter weight for personalized goal"
            />
          </div>

          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {glasses} / {dailyGoal}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              glasses (8 oz each)
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {percentage.toFixed(0)}% of daily goal
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={removeGlass}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              - Remove
            </button>
            <button
              onClick={addGlass}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              + Add Glass
            </button>
          </div>
          <button
            onClick={reset}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Reset Day
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;
