import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface SleepData {
  bedtime: string;
  wakeTime: string;
  sleepQuality: number;
  mood: 'excellent' | 'good' | 'fair' | 'poor';
  caffeineIntake: number;
  screenTime: number;
  exercise: boolean;
  stress: number;
  notes: string;
}

interface SleepEntry extends SleepData {
  id: number;
  date: string;
  duration: number;
  sleepScore: number;
  timestamp: string;
}

interface UserProfile {
  age: string;
  sleepGoal: number;
  bedtimeGoal: string;
}

interface SleepInsight {
  type: 'warning' | 'tip';
  text: string;
}

const SleepTracker = () => {
  const [sleepData, setSleepData] = useState<SleepData>({
    bedtime: '',
    wakeTime: '',
    sleepQuality: 5,
    mood: 'good',
    caffeineIntake: 0,
    screenTime: 0,
    exercise: false,
    stress: 3,
    notes: ''
  });

  const [sleepHistory, setSleepHistory] = useState<SleepEntry[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: '',
    sleepGoal: 8,
    bedtimeGoal: '22:30'
  });

  // Load data from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('sleepHistory');
    const savedProfile = localStorage.getItem('sleepProfile');
    
    if (savedHistory) setSleepHistory(JSON.parse(savedHistory));
    if (savedProfile) setUserProfile(JSON.parse(savedProfile));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('sleepHistory', JSON.stringify(sleepHistory));
  }, [sleepHistory]);

  useEffect(() => {
    localStorage.setItem('sleepProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  const calculateSleepDuration = (bedtime: string, wakeTime: string): number => {
    if (!bedtime || !wakeTime) return 0;
    
    const bed = new Date(`2000-01-01 ${bedtime}`);
    let wake = new Date(`2000-01-01 ${wakeTime}`);
    
    // If wake time is earlier than bedtime, assume it's next day
    if (wake < bed) {
      wake = new Date(`2000-01-02 ${wakeTime}`);
    }
    
    const duration = (wake.getTime() - bed.getTime()) / (1000 * 60 * 60); // Convert to hours
    return Math.round(duration * 10) / 10; // Round to 1 decimal
  };

  const getSleepScore = (duration: number, quality: number, mood: string, stress: number): number => {
    let score = 0;
    
    // Duration score (0-40 points)
    if (duration >= 7 && duration <= 9) score += 40;
    else if (duration >= 6 && duration <= 10) score += 30;
    else if (duration >= 5 && duration <= 11) score += 20;
    else score += 10;
    
    // Quality score (0-30 points)
    score += (quality / 10) * 30;
    
    // Mood score (0-20 points)
    const moodScores: Record<string, number> = { excellent: 20, good: 15, fair: 10, poor: 5 };
    score += moodScores[mood] || 10;
    
    // Stress score (0-10 points) - lower stress = higher score
    score += (5 - stress) * 2;
    
    return Math.round(score);
  };

  const addSleepEntry = () => {
    if (!sleepData.bedtime || !sleepData.wakeTime) return;
    
    const duration = calculateSleepDuration(sleepData.bedtime, sleepData.wakeTime);
    const sleepScore = getSleepScore(duration, sleepData.sleepQuality, sleepData.mood, sleepData.stress);
    
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      ...sleepData,
      duration,
      sleepScore,
      timestamp: new Date().toISOString()
    };
    
    setSleepHistory(prev => [entry, ...prev.slice(0, 29)]); // Keep last 30 entries
    
    // Reset form
    setSleepData({
      bedtime: '',
      wakeTime: '',
      sleepQuality: 5,
      mood: 'good',
      caffeineIntake: 0,
      screenTime: 0,
      exercise: false,
      stress: 3,
      notes: ''
    });
  };

  const getAverages = () => {
    if (sleepHistory.length === 0) return null;
    
    const recent = sleepHistory.slice(0, 7); // Last 7 days
    const avgDuration = recent.reduce((sum, entry) => sum + entry.duration, 0) / recent.length;
    const avgQuality = recent.reduce((sum, entry) => sum + entry.sleepQuality, 0) / recent.length;
    const avgScore = recent.reduce((sum, entry) => sum + entry.sleepScore, 0) / recent.length;
    
    return {
      duration: Math.round(avgDuration * 10) / 10,
      quality: Math.round(avgQuality * 10) / 10,
      score: Math.round(avgScore)
    };
  };

  const getSleepInsights = (): SleepInsight[] => {
    if (sleepHistory.length < 3) return [];
    
    const insights: SleepInsight[] = [];
    const recent = sleepHistory.slice(0, 7);
    const avgDuration = recent.reduce((sum, entry) => sum + entry.duration, 0) / recent.length;
    const avgQuality = recent.reduce((sum, entry) => sum + entry.sleepQuality, 0) / recent.length;
    
    if (avgDuration < 7) {
      insights.push({ type: 'warning', text: 'You\'re getting less than 7 hours of sleep on average. Try going to bed earlier.' });
    }
    
    if (avgQuality < 6) {
      insights.push({ type: 'tip', text: 'Your sleep quality is below average. Consider reducing screen time before bed.' });
    }
    
    const highCaffeineEntries = recent.filter(entry => entry.caffeineIntake > 2);
    if (highCaffeineEntries.length > 3) {
      insights.push({ type: 'warning', text: 'High caffeine intake may be affecting your sleep quality.' });
    }
    
    const consistentBedtime = recent.every(entry => {
      const bedHour = parseInt(entry.bedtime.split(':')[0]);
      const goalHour = parseInt(userProfile.bedtimeGoal.split(':')[0]);
      return Math.abs(bedHour - goalHour) <= 1;
    });
    
    if (!consistentBedtime) {
      insights.push({ type: 'tip', text: 'Try to maintain a consistent bedtime for better sleep quality.' });
    }
    
    return insights;
  };

  const chartData = sleepHistory.slice(0, 14).reverse().map(entry => ({
    date: new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    duration: entry.duration,
    quality: entry.sleepQuality,
    score: entry.sleepScore
  }));

  const moodData = sleepHistory.slice(0, 30).reduce((acc: Record<string, number>, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const moodChartData = Object.entries(moodData).map(([mood, count]) => ({
    name: mood.charAt(0).toUpperCase() + mood.slice(1),
    value: count,
    color: ({
      excellent: '#10B981',
      good: '#3B82F6',
      fair: '#F59E0B',
      poor: '#EF4444'
    } as Record<string, string>)[mood] || '#6B7280'
  }));

  const averages = getAverages();
  const insights = getSleepInsights();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Sleep Quality Tracker</h2>
        <p className="text-gray-300">Monitor and improve your sleep patterns</p>
      </div>

      {/* Sleep Goals */}
      <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
        <h3 className="text-lg font-semibold text-white mb-4">Sleep Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
            <input
              type="number"
              value={userProfile.age}
              onChange={(e) => setUserProfile({ ...userProfile, age: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Sleep Goal (hours)</label>
            <input
              type="number"
              step="0.5"
              min="6"
              max="12"
              value={userProfile.sleepGoal}
              onChange={(e) => setUserProfile({ ...userProfile, sleepGoal: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Target Bedtime</label>
            <input
              type="time"
              value={userProfile.bedtimeGoal}
              onChange={(e) => setUserProfile({ ...userProfile, bedtimeGoal: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Sleep Entry Form */}
      <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
        <h3 className="text-lg font-semibold text-white mb-4">Log Today's Sleep</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Bedtime</label>
            <input
              type="time"
              value={sleepData.bedtime}
              onChange={(e) => setSleepData({ ...sleepData, bedtime: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Wake Time</label>
            <input
              type="time"
              value={sleepData.wakeTime}
              onChange={(e) => setSleepData({ ...sleepData, wakeTime: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Sleep Quality (1-10)</label>
            <input
              type="range"
              min="1"
              max="10"
              value={sleepData.sleepQuality}
              onChange={(e) => setSleepData({ ...sleepData, sleepQuality: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="text-center text-blue-400 font-semibold">{sleepData.sleepQuality}/10</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Morning Mood</label>
            <select
              value={sleepData.mood}
              onChange={(e) => setSleepData({ ...sleepData, mood: e.target.value as 'excellent' | 'good' | 'fair' | 'poor' })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Caffeine (cups)</label>
            <input
              type="number"
              min="0"
              max="10"
              value={sleepData.caffeineIntake}
              onChange={(e) => setSleepData({ ...sleepData, caffeineIntake: parseInt(e.target.value) })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Screen Time Before Bed (hours)</label>
            <input
              type="number"
              min="0"
              max="8"
              step="0.5"
              value={sleepData.screenTime}
              onChange={(e) => setSleepData({ ...sleepData, screenTime: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Stress Level (1-5)</label>
            <input
              type="range"
              min="1"
              max="5"
              value={sleepData.stress}
              onChange={(e) => setSleepData({ ...sleepData, stress: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="text-center text-blue-400 font-semibold">{sleepData.stress}/5</div>
          </div>
          <div className="flex items-center">
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                checked={sleepData.exercise}
                onChange={(e) => setSleepData({ ...sleepData, exercise: e.target.checked })}
                className="mr-2 rounded"
              />
              Exercised Today
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Notes (optional)</label>
          <textarea
            value={sleepData.notes}
            onChange={(e) => setSleepData({ ...sleepData, notes: e.target.value })}
            placeholder="Any additional notes about your sleep..."
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 h-20 resize-none"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="text-gray-300">
            {sleepData.bedtime && sleepData.wakeTime && (
              <span>Duration: <span className="text-blue-400 font-semibold">
                {calculateSleepDuration(sleepData.bedtime, sleepData.wakeTime)} hours
              </span></span>
            )}
          </div>
          <button
            onClick={addSleepEntry}
            disabled={!sleepData.bedtime || !sleepData.wakeTime}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Log Sleep
          </button>
        </div>
      </div>

      {/* Sleep Summary */}
      {averages && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{averages.duration}h</div>
            <div className="text-gray-300">Avg Sleep Duration</div>
            <div className="text-sm text-gray-400 mt-1">Last 7 days</div>
          </div>
          <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{averages.quality}/10</div>
            <div className="text-gray-300">Avg Sleep Quality</div>
            <div className="text-sm text-gray-400 mt-1">Last 7 days</div>
          </div>
          <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{averages.score}/100</div>
            <div className="text-gray-300">Sleep Score</div>
            <div className="text-sm text-gray-400 mt-1">Last 7 days</div>
          </div>
        </div>
      )}

      {/* Charts */}
      {chartData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sleep Trends */}
          <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
            <h3 className="text-xl font-semibold text-white mb-4">Sleep Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="duration" stroke="#3B82F6" strokeWidth={2} name="Duration (hrs)" />
                <Line type="monotone" dataKey="quality" stroke="#10B981" strokeWidth={2} name="Quality (1-10)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Mood Distribution */}
          <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
            <h3 className="text-xl font-semibold text-white mb-4">Morning Mood Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={moodChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {moodChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Sleep Insights */}
      {insights.length > 0 && (
        <div className="bg-blue-600/20 border border-blue-500/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-300 mb-3">Sleep Insights:</h3>
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div key={index} className={`flex items-start gap-2 ${
                insight.type === 'warning' ? 'text-yellow-200' : 'text-blue-200'
              }`}>
                <span className="text-lg">
                  {insight.type === 'warning' ? '⚠️' : '💡'}
                </span>
                <span className="text-sm">{insight.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sleep Tips */}
      <div className="bg-purple-600/20 border border-purple-500/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-purple-300 mb-3">Sleep Hygiene Tips:</h3>
        <ul className="text-purple-200 text-sm space-y-2">
          <li>• Maintain a consistent sleep schedule, even on weekends</li>
          <li>• Create a relaxing bedtime routine 30-60 minutes before sleep</li>
          <li>• Avoid screens 1 hour before bedtime or use blue light filters</li>
          <li>• Keep your bedroom cool (60-67°F), dark, and quiet</li>
          <li>• Avoid caffeine 6 hours before bedtime</li>
          <li>• Exercise regularly, but not close to bedtime</li>
          <li>• Get natural sunlight exposure during the day</li>
          <li>• Avoid large meals and alcohol before bedtime</li>
        </ul>
      </div>

      {/* Recent Sleep History */}
      {sleepHistory.length > 0 && (
        <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Sleep Log</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {sleepHistory.slice(0, 7).map((entry) => (
              <div key={entry.id} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <span className="text-white font-medium">{entry.date}</span>
                    <span className="text-blue-400">{entry.duration}h sleep</span>
                    <span className="text-green-400">Quality: {entry.sleepQuality}/10</span>
                    <span className="text-purple-400">Score: {entry.sleepScore}/100</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {entry.bedtime} - {entry.wakeTime} • Mood: {entry.mood}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SleepTracker;
