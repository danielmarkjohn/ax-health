import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GrowthChart = () => {
  const [childData, setChildData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 'male'
  });
  const [measurements, setMeasurements] = useState([]);

  // WHO Growth Standards for Indian children (0-5 years)
  const whoStandards = {
    male: {
      weight: [
        { age: 0, p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.4 },
        { age: 6, p3: 6.4, p15: 7.1, p50: 7.9, p85: 8.8, p97: 9.8 },
        { age: 12, p3: 8.4, p15: 9.4, p50: 10.4, p85: 11.7, p97: 13.0 },
        { age: 24, p3: 10.8, p15: 12.2, p50: 13.4, p85: 15.3, p97: 17.1 },
        { age: 36, p3: 12.7, p15: 14.3, p50: 15.7, p85: 17.8, p97: 20.0 },
        { age: 48, p3: 14.1, p15: 16.0, p50: 17.7, p85: 20.3, p97: 23.0 },
        { age: 60, p3: 15.9, p15: 18.0, p50: 20.0, p85: 23.0, p97: 26.0 }
      ],
      height: [
        { age: 0, p3: 46.1, p15: 48.0, p50: 49.9, p85: 51.8, p97: 53.7 },
        { age: 6, p3: 63.3, p15: 65.5, p50: 67.6, p85: 69.8, p97: 72.0 },
        { age: 12, p3: 71.0, p15: 73.4, p50: 75.7, p85: 78.1, p97: 80.5 },
        { age: 24, p3: 81.7, p15: 84.9, p50: 87.1, p85: 90.2, p97: 93.2 },
        { age: 36, p3: 88.7, p15: 92.4, p50: 95.1, p85: 98.7, p97: 102.0 },
        { age: 48, p3: 94.9, p15: 99.1, p50: 102.0, p85: 106.0, p97: 109.9 },
        { age: 60, p3: 100.7, p15: 105.3, p50: 109.0, p85: 113.5, p97: 117.7 }
      ]
    },
    female: {
      weight: [
        { age: 0, p3: 2.4, p15: 2.8, p50: 3.2, p85: 3.7, p97: 4.2 },
        { age: 6, p3: 5.9, p15: 6.5, p50: 7.3, p85: 8.2, p97: 9.3 },
        { age: 12, p3: 7.8, p15: 8.7, p50: 9.8, p85: 11.0, p97: 12.4 },
        { age: 24, p3: 10.2, p15: 11.5, p50: 12.8, p85: 14.8, p97: 16.8 },
        { age: 36, p3: 12.2, p15: 13.9, p50: 15.4, p85: 17.6, p97: 20.0 },
        { age: 48, p3: 13.7, p15: 15.7, p50: 17.4, p85: 20.0, p97: 22.9 },
        { age: 60, p3: 15.3, p15: 17.7, p50: 19.7, p85: 22.7, p97: 26.2 }
      ],
      height: [
        { age: 0, p3: 45.4, p15: 47.3, p50: 49.1, p85: 51.0, p97: 52.9 },
        { age: 6, p3: 61.2, p15: 63.5, p50: 65.7, p85: 68.0, p97: 70.3 },
        { age: 12, p3: 68.9, p15: 71.4, p50: 74.0, p85: 76.6, p97: 79.2 },
        { age: 24, p3: 80.0, p15: 83.2, p50: 86.4, p85: 89.6, p97: 92.9 },
        { age: 36, p3: 87.4, p15: 91.2, p50: 94.1, p85: 97.9, p97: 101.6 },
        { age: 48, p3: 93.1, p15: 97.4, p50: 100.6, p85: 105.0, p97: 109.0 },
        { age: 60, p3: 98.7, p15: 103.7, p50: 107.4, p85: 112.5, p97: 117.3 }
      ]
    }
  };

  const addMeasurement = () => {
    if (childData.age && childData.weight && childData.height) {
      const newMeasurement = {
        age: parseFloat(childData.age),
        weight: parseFloat(childData.weight),
        height: parseFloat(childData.height),
        date: new Date().toLocaleDateString()
      };
      setMeasurements([...measurements, newMeasurement]);
      setChildData({ ...childData, age: '', weight: '', height: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">WHO Growth Chart</h2>
        <p className="text-gray-300">Track child growth according to WHO standards for Indian children</p>
      </div>

      {/* Input Form */}
      <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
            <select
              value={childData.gender}
              onChange={(e) => setChildData({ ...childData, gender: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Age (months)</label>
            <input
              type="number"
              value={childData.age}
              onChange={(e) => setChildData({ ...childData, age: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              placeholder="0-60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={childData.weight}
              onChange={(e) => setChildData({ ...childData, weight: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Weight"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
            <input
              type="number"
              step="0.1"
              value={childData.height}
              onChange={(e) => setChildData({ ...childData, height: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Height"
            />
          </div>
        </div>
        <button
          onClick={addMeasurement}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        >
          Add Measurement
        </button>
      </div>

      {/* Charts */}
      {measurements.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weight Chart */}
          <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
            <h3 className="text-xl font-semibold text-white mb-4">Weight for Age</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={whoStandards[childData.gender].weight}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="age" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Legend />
                <Line type="monotone" dataKey="p3" stroke="#EF4444" strokeWidth={1} name="3rd percentile" />
                <Line type="monotone" dataKey="p15" stroke="#F59E0B" strokeWidth={1} name="15th percentile" />
                <Line type="monotone" dataKey="p50" stroke="#10B981" strokeWidth={2} name="50th percentile" />
                <Line type="monotone" dataKey="p85" stroke="#F59E0B" strokeWidth={1} name="85th percentile" />
                <Line type="monotone" dataKey="p97" stroke="#EF4444" strokeWidth={1} name="97th percentile" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Height Chart */}
          <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
            <h3 className="text-xl font-semibold text-white mb-4">Height for Age</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={whoStandards[childData.gender].height}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="age" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Legend />
                <Line type="monotone" dataKey="p3" stroke="#EF4444" strokeWidth={1} name="3rd percentile" />
                <Line type="monotone" dataKey="p15" stroke="#F59E0B" strokeWidth={1} name="15th percentile" />
                <Line type="monotone" dataKey="p50" stroke="#10B981" strokeWidth={2} name="50th percentile" />
                <Line type="monotone" dataKey="p85" stroke="#F59E0B" strokeWidth={1} name="85th percentile" />
                <Line type="monotone" dataKey="p97" stroke="#EF4444" strokeWidth={1} name="97th percentile" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Measurements History */}
      {measurements.length > 0 && (
        <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
          <h3 className="text-xl font-semibold text-white mb-4">Measurement History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-gray-300">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Age (months)</th>
                  <th className="text-left py-2">Weight (kg)</th>
                  <th className="text-left py-2">Height (cm)</th>
                </tr>
              </thead>
              <tbody>
                {measurements.map((measurement, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-2">{measurement.date}</td>
                    <td className="py-2">{measurement.age}</td>
                    <td className="py-2">{measurement.weight}</td>
                    <td className="py-2">{measurement.height}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrowthChart;