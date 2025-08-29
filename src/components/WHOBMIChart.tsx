import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WHOBMIChart = () => {
  const [userBMI, setUserBMI] = useState({ age: '', bmi: '' });

  // WHO BMI-for-age percentiles (5-19 years)
  const whoBMIData = [
    { age: 5, p3: 13.1, p15: 13.7, p50: 15.0, p85: 16.8, p97: 18.8 },
    { age: 6, p3: 13.0, p15: 13.6, p50: 15.0, p85: 16.9, p97: 19.3 },
    { age: 7, p3: 12.9, p15: 13.6, p50: 15.1, p85: 17.2, p97: 20.0 },
    { age: 8, p3: 12.9, p15: 13.6, p50: 15.2, p85: 17.5, p97: 20.7 },
    { age: 9, p3: 12.9, p15: 13.7, p50: 15.4, p85: 17.9, p97: 21.4 },
    { age: 10, p3: 13.0, p15: 13.8, p50: 15.6, p85: 18.3, p97: 22.2 },
    { age: 11, p3: 13.1, p15: 14.0, p50: 15.8, p85: 18.8, p97: 23.0 },
    { age: 12, p3: 13.2, p15: 14.2, p50: 16.1, p85: 19.3, p97: 23.8 },
    { age: 13, p3: 13.4, p15: 14.4, p50: 16.4, p85: 19.8, p97: 24.7 },
    { age: 14, p3: 13.6, p15: 14.7, p50: 16.7, p85: 20.3, p97: 25.6 },
    { age: 15, p3: 13.8, p15: 15.0, p50: 17.0, p85: 20.8, p97: 26.4 },
    { age: 16, p3: 14.0, p15: 15.3, p50: 17.4, p85: 21.3, p97: 27.2 },
    { age: 17, p3: 14.2, p15: 15.6, p50: 17.7, p85: 21.7, p97: 27.9 },
    { age: 18, p3: 14.4, p15: 15.8, p50: 18.0, p85: 22.2, p97: 28.6 },
    { age: 19, p3: 14.6, p15: 16.1, p50: 18.3, p85: 22.6, p97: 29.2 }
  ];

  const getBMICategory = (bmi, age) => {
    const ageData = whoBMIData.find(d => d.age === parseInt(age));
    if (!ageData) return { category: 'Unknown', color: 'text-gray-400' };

    if (bmi < ageData.p3) return { category: 'Severely Underweight', color: 'text-red-400' };
    if (bmi < ageData.p15) return { category: 'Underweight', color: 'text-orange-400' };
    if (bmi < ageData.p85) return { category: 'Normal Weight', color: 'text-green-400' };
    if (bmi < ageData.p97) return { category: 'Overweight', color: 'text-yellow-400' };
    return { category: 'Obese', color: 'text-red-400' };
  };

  const bmiCategory = userBMI.age && userBMI.bmi ? getBMICategory(parseFloat(userBMI.bmi), userBMI.age) : null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">WHO BMI Chart</h2>
        <p className="text-gray-300">BMI-for-age percentiles for children and adolescents (5-19 years)</p>
      </div>

      {/* Input Section */}
      <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Age (years)</label>
            <input
              type="number"
              min="5"
              max="19"
              value={userBMI.age}
              onChange={(e) => setUserBMI({ ...userBMI, age: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              placeholder="5-19 years"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">BMI</label>
            <input
              type="number"
              step="0.1"
              value={userBMI.bmi}
              onChange={(e) => setUserBMI({ ...userBMI, bmi: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              placeholder="BMI value"
            />
          </div>
          {bmiCategory && (
            <div className="text-center">
              <div className={`text-lg font-semibold ${bmiCategory.color}`}>
                {bmiCategory.category}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BMI Chart */}
      <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
        <h3 className="text-xl font-semibold text-white mb-4">WHO BMI-for-Age Percentiles</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={whoBMIData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="age" 
              stroke="#9CA3AF"
              label={{ value: 'Age (years)', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
            />
            <YAxis 
              stroke="#9CA3AF"
              label={{ value: 'BMI (kg/m²)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#F3F4F6' }}
            />
            <Legend />
            <Line type="monotone" dataKey="p3" stroke="#EF4444" strokeWidth={2} name="3rd percentile (Severely Underweight)" />
            <Line type="monotone" dataKey="p15" stroke="#F59E0B" strokeWidth={2} name="15th percentile (Underweight)" />
            <Line type="monotone" dataKey="p50" stroke="#10B981" strokeWidth={3} name="50th percentile (Normal)" />
            <Line type="monotone" dataKey="p85" stroke="#F59E0B" strokeWidth={2} name="85th percentile (Overweight)" />
            <Line type="monotone" dataKey="p97" stroke="#EF4444" strokeWidth={2} name="97th percentile (Obese)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BMI Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { name: 'Severely Underweight', range: '< 3rd percentile', color: 'bg-red-600/20 border-red-500/50 text-red-300' },
          { name: 'Underweight', range: '3rd - 15th percentile', color: 'bg-orange-600/20 border-orange-500/50 text-orange-300' },
          { name: 'Normal Weight', range: '15th - 85th percentile', color: 'bg-green-600/20 border-green-500/50 text-green-300' },
          { name: 'Overweight', range: '85th - 97th percentile', color: 'bg-yellow-600/20 border-yellow-500/50 text-yellow-300' },
          { name: 'Obese', range: '> 97th percentile', color: 'bg-red-600/20 border-red-500/50 text-red-300' }
        ].map((category, index) => (
          <div key={index} className={`p-4 rounded-lg border ${category.color}`}>
            <h4 className="font-semibold text-sm">{category.name}</h4>
            <p className="text-xs opacity-80 mt-1">{category.range}</p>
          </div>
        ))}
      </div>

      {/* Information */}
      <div className="bg-blue-600/20 border border-blue-500/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-300 mb-3">About WHO BMI Charts:</h3>
        <ul className="text-blue-200 text-sm space-y-2">
          <li>• Based on WHO Growth Reference Study for children 5-19 years</li>
          <li>• Percentiles indicate how a child's BMI compares to other children of the same age</li>
          <li>• BMI-for-age is more appropriate than adult BMI categories for children</li>
          <li>• Consider growth patterns and consult healthcare provider for interpretation</li>
          <li>• These charts are applicable for Indian children following WHO standards</li>
        </ul>
      </div>
    </div>
  );
};

export default WHOBMIChart;