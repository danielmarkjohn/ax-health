import React, { useState } from "react";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!isNaN(w) && !isNaN(h) && h > 0) {
      setBmi(w / (h * h));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">BMI Calculator</h2>
        <p className="text-gray-300">Calculate your Body Mass Index</p>
      </div>
      
      <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
            <input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={calculate} 
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Calculate
          </button>
        </div>
      </div>
      
      {bmi && (
        <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50 text-center">
          <div className="text-4xl font-bold text-blue-400 mb-2">{bmi.toFixed(2)}</div>
          <div className="text-lg text-gray-300">Your BMI</div>
        </div>
      )}
    </div>
  );
}
