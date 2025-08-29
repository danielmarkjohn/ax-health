import React, { useState } from 'react';

interface RiskResult {
  score: number;
  riskLevel: string;
  riskColor: string;
  recommendations: string[];
  bmi: string;
}

const DiabetesRiskCalculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    waist: '',
    height: '',
    weight: '',
    physicalActivity: 'daily',
    vegetableIntake: 'daily',
    hypertensionMeds: 'no',
    highGlucose: 'no',
    familyHistory: 'no'
  });

  const [result, setResult] = useState<RiskResult | null>(null);

  // Indian Diabetes Risk Score (IDRS) calculation
  const calculateRisk = () => {
    let score = 0;

    // Age scoring
    const age = parseInt(formData.age);
    if (age >= 35 && age < 50) score += 20;
    else if (age >= 50) score += 30;

    // Waist circumference (Indian standards)
    const waist = parseInt(formData.waist);
    if (formData.gender === 'male') {
      if (waist >= 90 && waist < 100) score += 10;
      else if (waist >= 100) score += 20;
    } else {
      if (waist >= 80 && waist < 90) score += 10;
      else if (waist >= 90) score += 20;
    }

    // Physical activity
    if (formData.physicalActivity === 'occasional') score += 20;
    else if (formData.physicalActivity === 'none') score += 30;

    // Family history
    if (formData.familyHistory === 'yes') score += 10;

    // Calculate BMI
    const height = parseInt(formData.height) / 100;
    const weight = parseInt(formData.weight);
    const bmi = weight / (height * height);

    if (bmi >= 25 && bmi < 30) score += 10;
    else if (bmi >= 30) score += 20;

    // Additional risk factors
    if (formData.hypertensionMeds === 'yes') score += 10;
    if (formData.highGlucose === 'yes') score += 10;

    let riskLevel, riskColor, recommendations;

    if (score < 30) {
      riskLevel = 'Low Risk';
      riskColor = 'text-green-400';
      recommendations = [
        'Maintain healthy lifestyle',
        'Regular physical activity',
        'Balanced diet with vegetables',
        'Annual health checkups'
      ];
    } else if (score < 50) {
      riskLevel = 'Moderate Risk';
      riskColor = 'text-yellow-400';
      recommendations = [
        'Increase physical activity to 150 min/week',
        'Reduce waist circumference',
        'Include more vegetables and fiber',
        'Monitor blood glucose every 6 months',
        'Consult healthcare provider'
      ];
    } else {
      riskLevel = 'High Risk';
      riskColor = 'text-red-400';
      recommendations = [
        'Immediate lifestyle modification required',
        'Structured exercise program',
        'Weight reduction if overweight',
        'Regular blood glucose monitoring',
        'Consult endocrinologist',
        'Consider preventive medications'
      ];
    }

    setResult({
      score,
      riskLevel,
      riskColor,
      recommendations,
      bmi: bmi.toFixed(1)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.age && formData.waist && formData.height && formData.weight) {
      calculateRisk();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Diabetes Risk Calculator</h2>
        <p className="text-gray-300">Indian Diabetes Risk Score (IDRS) Assessment</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
          <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Age (years)</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Waist Circumference (cm)</label>
              <input
                type="number"
                value={formData.waist}
                onChange={(e) => setFormData({ ...formData, waist: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Lifestyle Factors */}
        <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
          <h3 className="text-lg font-semibold text-white mb-4">Lifestyle Factors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Physical Activity</label>
              <select
                value={formData.physicalActivity}
                onChange={(e) => setFormData({ ...formData, physicalActivity: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily exercise (≥30 min)</option>
                <option value="occasional">Occasional exercise</option>
                <option value="none">No regular exercise</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Vegetable/Fruit Intake</label>
              <select
                value={formData.vegetableIntake}
                onChange={(e) => setFormData({ ...formData, vegetableIntake: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily</option>
                <option value="occasional">Occasional</option>
                <option value="rarely">Rarely</option>
              </select>
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
          <h3 className="text-lg font-semibold text-white mb-4">Medical History</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Taking BP medications?</label>
              <select
                value={formData.hypertensionMeds}
                onChange={(e) => setFormData({ ...formData, hypertensionMeds: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">History of high blood glucose?</label>
              <select
                value={formData.highGlucose}
                onChange={(e) => setFormData({ ...formData, highGlucose: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Family history of diabetes?</label>
              <select
                value={formData.familyHistory}
                onChange={(e) => setFormData({ ...formData, familyHistory: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
        >
          Calculate Diabetes Risk
        </button>
      </form>

      {/* Results */}
      {result && (
        <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
          <h3 className="text-xl font-semibold text-white mb-4">Risk Assessment Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{result.score}</div>
              <div className="text-sm text-gray-400">IDRS Score</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${result.riskColor}`}>{result.riskLevel}</div>
              <div className="text-sm text-gray-400">Risk Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{result.bmi}</div>
              <div className="text-sm text-gray-400">BMI</div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-3">Recommendations:</h4>
            <ul className="text-gray-300 space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Risk Score Interpretation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-600/20 border border-green-500/50 rounded-lg p-4">
          <h4 className="font-semibold text-green-300 mb-2">Low Risk</h4>
          <p className="text-green-200 text-sm">Score: &lt; 30</p>
          <p className="text-green-200 text-sm mt-1">Continue healthy lifestyle</p>
        </div>
        <div className="bg-yellow-600/20 border border-yellow-500/50 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-300 mb-2">Moderate Risk</h4>
          <p className="text-yellow-200 text-sm">Score: 30-49</p>
          <p className="text-yellow-200 text-sm mt-1">Lifestyle modification needed</p>
        </div>
        <div className="bg-red-600/20 border border-red-500/50 rounded-lg p-4">
          <h4 className="font-semibold text-red-300 mb-2">High Risk</h4>
          <p className="text-red-200 text-sm">Score: ≥ 50</p>
          <p className="text-red-200 text-sm mt-1">Medical consultation required</p>
        </div>
      </div>

      {/* Information */}
      <div className="bg-blue-600/20 border border-blue-500/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-300 mb-3">About IDRS:</h3>
        <ul className="text-blue-200 text-sm space-y-2">
          <li>• Indian Diabetes Risk Score developed specifically for Indian population</li>
          <li>• Validated tool for screening diabetes risk in community settings</li>
          <li>• Based on age, waist circumference, physical activity, and family history</li>
          <li>• High-risk individuals should undergo glucose tolerance test</li>
          <li>• Early detection and prevention can significantly reduce diabetes risk</li>
        </ul>
      </div>
    </div>
  );
};

export default DiabetesRiskCalculator;
