import React, { useState } from "react";

const BodyFatCalculator = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");

  const calculateBodyFat = () => {
    if (!weight || !height || !neck || !waist) return null;
    if (gender === "female" && !hip) return null;

    const heightCm = parseFloat(height) * 2.54;
    const neckCm = parseFloat(neck) * 2.54;
    const waistCm = parseFloat(waist) * 2.54;
    const hipCm = gender === "female" ? parseFloat(hip) * 2.54 : 0;

    let bodyFat;
    if (gender === "male") {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    } else {
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
    }

    return Math.max(0, bodyFat);
  };

  const bodyFat = calculateBodyFat();

  const getCategory = (bf: number, gender: string) => {
    if (gender === "male") {
      if (bf < 6) return { category: "Essential Fat", color: "text-blue-600" };
      if (bf < 14) return { category: "Athletes", color: "text-green-600" };
      if (bf < 18) return { category: "Fitness", color: "text-green-500" };
      if (bf < 25) return { category: "Average", color: "text-yellow-600" };
      return { category: "Obese", color: "text-red-600" };
    } else {
      if (bf < 14) return { category: "Essential Fat", color: "text-blue-600" };
      if (bf < 21) return { category: "Athletes", color: "text-green-600" };
      if (bf < 25) return { category: "Fitness", color: "text-green-500" };
      if (bf < 32) return { category: "Average", color: "text-yellow-600" };
      return { category: "Obese", color: "text-red-600" };
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Body Fat Calculator</h2>
        <p className="text-gray-300">Estimate your body fat percentage</p>
      </div>
      
      <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
            <input
              type="number"
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
            <input
              type="number"
              placeholder="Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={calculateBodyFat}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Calculate
          </button>
        </div>
      </div>
      
      {bodyFat && (
        <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50 text-center">
          <div className="text-4xl font-bold text-blue-400 mb-2">{bodyFat.toFixed(1)}%</div>
          <div className="text-lg text-gray-300">Estimated Body Fat Percentage</div>
        </div>
      )}
    </div>
  );
};

export default BodyFatCalculator;
