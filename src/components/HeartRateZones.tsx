import React, { useState } from "react";

const HeartRateZones = () => {
  const [age, setAge] = useState("");
  const [restingHR, setRestingHR] = useState("");

  const maxHR = age ? 220 - parseInt(age) : 0;
  const hrReserve = maxHR - (restingHR ? parseInt(restingHR) : 60);

  const zones = [
    { name: "Recovery", min: 50, max: 60, color: "bg-gray-400", description: "Active recovery" },
    { name: "Aerobic Base", min: 60, max: 70, color: "bg-blue-400", description: "Fat burning" },
    { name: "Aerobic", min: 70, max: 80, color: "bg-green-400", description: "Endurance building" },
    { name: "Lactate Threshold", min: 80, max: 90, color: "bg-yellow-400", description: "Performance" },
    { name: "VO2 Max", min: 90, max: 100, color: "bg-red-400", description: "Maximum effort" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Heart Rate Zones</h2>
        <p className="text-gray-300">Calculate your target heart rate zones</p>
      </div>
      
      <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
            <input
              type="number"
              placeholder="Your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={calculateZones}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Calculate Zones
          </button>
        </div>
      </div>
      
      {zones.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {zones.map((zone, index) => (
            <div key={index} className="bg-gray-700/50 rounded-xl p-4 backdrop-blur-sm border border-gray-600/50">
              <h4 className="font-semibold text-white mb-2">{zone.name}</h4>
              <div className="text-2xl font-bold text-blue-400">{zone.min}-{zone.max}</div>
              <div className="text-sm text-gray-300">BPM</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeartRateZones;
