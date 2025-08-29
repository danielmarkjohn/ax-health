import React, { useState } from 'react';

interface Reading {
  systolic: number;
  diastolic: number;
  age: string;
  date: string;
  time: string;
}

const BloodPressureTracker = () => {
  const [reading, setReading] = useState({ systolic: '', diastolic: '', age: '' });
  const [readings, setReadings] = useState<Reading[]>([]);

  const addReading = () => {
    if (reading.systolic && reading.diastolic) {
      const newReading = {
        ...reading,
        systolic: parseInt(reading.systolic),
        diastolic: parseInt(reading.diastolic),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      };
      setReadings([newReading, ...readings]);
      setReading({ systolic: '', diastolic: '', age: reading.age });
    }
  };

  const getBPCategory = (systolic, diastolic, age) => {
    // Adult categories (18+ years)
    if (!age || age >= 18) {
      if (systolic < 120 && diastolic < 80) return { category: 'Normal', color: 'text-green-400' };
      if (systolic < 130 && diastolic < 80) return { category: 'Elevated', color: 'text-yellow-400' };
      if (systolic < 140 || diastolic < 90) return { category: 'High BP Stage 1', color: 'text-orange-400' };
      if (systolic < 180 || diastolic < 120) return { category: 'High BP Stage 2', color: 'text-red-400' };
      return { category: 'Hypertensive Crisis', color: 'text-red-600' };
    }
    
    // Pediatric categories (simplified)
    if (age < 13) {
      if (systolic < 110 && diastolic < 70) return { category: 'Normal', color: 'text-green-400' };
      if (systolic < 120 && diastolic < 80) return { category: 'Elevated', color: 'text-yellow-400' };
      return { category: 'High', color: 'text-red-400' };
    } else {
      if (systolic < 120 && diastolic < 80) return { category: 'Normal', color: 'text-green-400' };
      if (systolic < 130 && diastolic < 85) return { category: 'Elevated', color: 'text-yellow-400' };
      return { category: 'High', color: 'text-red-400' };
    }
  };

  const currentCategory = reading.systolic && reading.diastolic ? 
    getBPCategory(parseInt(reading.systolic), parseInt(reading.diastolic), parseInt(reading.age)) : null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Blood Pressure Tracker</h2>
        <p className="text-gray-300">Monitor and track blood pressure readings</p>
      </div>

      {/* Input Form */}
      <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Age (years)</label>
            <input
              type="number"
              value={reading.age}
              onChange={(e) => setReading({ ...reading, age: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Age"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Systolic (mmHg)</label>
            <input
              type="number"
              value={reading.systolic}
              onChange={(e) => setReading({ ...reading, systolic: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              placeholder="120"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Diastolic (mmHg)</label>
            <input
              type="number"
              value={reading.diastolic}
              onChange={(e) => setReading({ ...reading, diastolic: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              placeholder="80"
            />
          </div>
          <div className="flex flex-col gap-2">
            {currentCategory && (
              <div className={`text-center font-semibold ${currentCategory.color}`}>
                {currentCategory.category}
              </div>
            )}
            <button
              onClick={addReading}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Add Reading
            </button>
          </div>
        </div>
      </div>

      {/* BP Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { name: 'Normal', range: '<120 and <80', color: 'bg-green-600/20 border-green-500/50 text-green-300' },
          { name: 'Elevated', range: '120-129 and <80', color: 'bg-yellow-600/20 border-yellow-500/50 text-yellow-300' },
          { name: 'Stage 1', range: '130-139 or 80-89', color: 'bg-orange-600/20 border-orange-500/50 text-orange-300' },
          { name: 'Stage 2', range: '140-179 or 90-119', color: 'bg-red-600/20 border-red-500/50 text-red-300' },
          { name: 'Crisis', range: '≥180 or ≥120', color: 'bg-red-700/20 border-red-600/50 text-red-300' }
        ].map((category, index) => (
          <div key={index} className={`p-4 rounded-lg border ${category.color}`}>
            <h4 className="font-semibold text-sm">{category.name}</h4>
            <p className="text-xs opacity-80 mt-1">{category.range}</p>
          </div>
        ))}
      </div>

      {/* Recent Readings */}
      {readings.length > 0 && (
        <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Readings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-gray-300">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Time</th>
                  <th className="text-left py-2">Systolic</th>
                  <th className="text-left py-2">Diastolic</th>
                  <th className="text-left py-2">Category</th>
                </tr>
              </thead>
              <tbody>
                {readings.slice(0, 10).map((r, index) => {
                  const category = getBPCategory(r.systolic, r.diastolic, r.age);
                  return (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-2">{r.date}</td>
                      <td className="py-2">{r.time}</td>
                      <td className="py-2">{r.systolic}</td>
                      <td className="py-2">{r.diastolic}</td>
                      <td className={`py-2 font-semibold ${category.color}`}>{category.category}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-600/20 border border-blue-500/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-300 mb-3">Blood Pressure Tips:</h3>
        <ul className="text-blue-200 text-sm space-y-2">
          <li>• Measure at the same time daily, preferably morning</li>
          <li>• Sit quietly for 5 minutes before measuring</li>
          <li>• Use proper cuff size and positioning</li>
          <li>• Avoid caffeine, exercise, and smoking 30 minutes before</li>
          <li>• Take multiple readings and record the average</li>
          <li>• Consult doctor if readings are consistently high</li>
        </ul>
      </div>
    </div>
  );
};

export default BloodPressureTracker;
