import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

const NutritionTracker = () => {
  const [dailyIntake, setDailyIntake] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    water: 0
  });

  const [userProfile, setUserProfile] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activity: 'moderate'
  });

  const [foodItem, setFoodItem] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    fiber: '',
    quantity: '1'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [mealHistory, setMealHistory] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState('breakfast');

  // Enhanced Indian food database
  const indianFoods = {
    'Rice (1 cup cooked)': { calories: 205, protein: 4.3, carbs: 45, fat: 0.4, fiber: 0.6 },
    'Brown Rice (1 cup cooked)': { calories: 216, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5 },
    'Roti (1 medium)': { calories: 71, protein: 3, carbs: 15, fat: 0.4, fiber: 2.7 },
    'Naan (1 piece)': { calories: 262, protein: 9, carbs: 45, fat: 5, fiber: 2 },
    'Dal (1 cup)': { calories: 230, protein: 18, carbs: 40, fat: 0.8, fiber: 16 },
    'Rajma (1 cup)': { calories: 245, protein: 15, carbs: 45, fat: 1, fiber: 13 },
    'Chole (1 cup)': { calories: 269, protein: 15, carbs: 45, fat: 4, fiber: 12 },
    'Chicken Curry (100g)': { calories: 165, protein: 25, carbs: 5, fat: 5, fiber: 1 },
    'Mutton Curry (100g)': { calories: 250, protein: 26, carbs: 3, fat: 15, fiber: 0.5 },
    'Fish Curry (100g)': { calories: 136, protein: 20, carbs: 4, fat: 4, fiber: 0.5 },
    'Paneer (100g)': { calories: 265, protein: 18, carbs: 1.2, fat: 20, fiber: 0 },
    'Tofu (100g)': { calories: 76, protein: 8, carbs: 1.9, fat: 4.8, fiber: 0.4 },
    'Egg (1 large)': { calories: 70, protein: 6, carbs: 0.6, fat: 5, fiber: 0 },
    'Banana (1 medium)': { calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1 },
    'Apple (1 medium)': { calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4 },
    'Orange (1 medium)': { calories: 62, protein: 1.2, carbs: 15.4, fat: 0.2, fiber: 3.1 },
    'Mango (1 cup sliced)': { calories: 107, protein: 1, carbs: 28, fat: 0.5, fiber: 3 },
    'Milk (1 cup)': { calories: 150, protein: 8, carbs: 12, fat: 8, fiber: 0 },
    'Yogurt (1 cup)': { calories: 154, protein: 13, carbs: 17, fat: 4, fiber: 0 },
    'Ghee (1 tbsp)': { calories: 112, protein: 0, carbs: 0, fat: 12.8, fiber: 0 },
    'Coconut Oil (1 tbsp)': { calories: 117, protein: 0, carbs: 0, fat: 13.6, fiber: 0 },
    'Almonds (10 pieces)': { calories: 69, protein: 2.6, carbs: 2.6, fat: 6, fiber: 1.2 },
    'Walnuts (5 halves)': { calories: 65, protein: 1.5, carbs: 1.4, fat: 6.5, fiber: 0.7 }
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('nutritionProfile');
    const savedIntake = localStorage.getItem('dailyIntake');
    const savedHistory = localStorage.getItem('mealHistory');
    
    if (savedProfile) setUserProfile(JSON.parse(savedProfile));
    if (savedIntake) setDailyIntake(JSON.parse(savedIntake));
    if (savedHistory) setMealHistory(JSON.parse(savedHistory));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('nutritionProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('dailyIntake', JSON.stringify(dailyIntake));
  }, [dailyIntake]);

  useEffect(() => {
    localStorage.setItem('mealHistory', JSON.stringify(mealHistory));
  }, [mealHistory]);

  const calculateDailyNeeds = () => {
    if (!userProfile.weight || !userProfile.height || !userProfile.age) return null;

    const weight = parseFloat(userProfile.weight);
    const height = parseFloat(userProfile.height);
    const age = parseFloat(userProfile.age);

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (userProfile.gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    const tdee = bmr * activityMultipliers[userProfile.activity];

    return {
      calories: Math.round(tdee),
      protein: Math.round(weight * 1.6), // Increased to 1.6g per kg
      carbs: Math.round(tdee * 0.45 / 4), // 45% of calories from carbs
      fat: Math.round(tdee * 0.30 / 9), // 30% of calories from fat
      fiber: age < 50 ? (userProfile.gender === 'male' ? 38 : 25) : (userProfile.gender === 'male' ? 30 : 21),
      water: Math.round(weight * 35) // 35ml per kg body weight
    };
  };

  const addFood = (food, nutrition, quantity = 1) => {
    const adjustedNutrition = {
      calories: nutrition.calories * quantity,
      protein: nutrition.protein * quantity,
      carbs: nutrition.carbs * quantity,
      fat: nutrition.fat * quantity,
      fiber: (nutrition.fiber || 0) * quantity
    };

    setDailyIntake(prev => ({
      calories: prev.calories + adjustedNutrition.calories,
      protein: prev.protein + adjustedNutrition.protein,
      carbs: prev.carbs + adjustedNutrition.carbs,
      fat: prev.fat + adjustedNutrition.fat,
      fiber: prev.fiber + adjustedNutrition.fiber,
      water: prev.water
    }));

    // Add to meal history
    const mealEntry = {
      id: Date.now(),
      name: food,
      meal: selectedMeal,
      quantity,
      nutrition: adjustedNutrition,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString()
    };

    setMealHistory(prev => [mealEntry, ...prev.slice(0, 49)]); // Keep last 50 entries
  };

  const addCustomFood = () => {
    if (foodItem.name && foodItem.calories) {
      const nutrition = {
        calories: parseFloat(foodItem.calories) || 0,
        protein: parseFloat(foodItem.protein) || 0,
        carbs: parseFloat(foodItem.carbs) || 0,
        fat: parseFloat(foodItem.fat) || 0,
        fiber: parseFloat(foodItem.fiber) || 0
      };
      const quantity = parseFloat(foodItem.quantity) || 1;
      
      addFood(foodItem.name, nutrition, quantity);
      setFoodItem({ name: '', calories: '', protein: '', carbs: '', fat: '', fiber: '', quantity: '1' });
    }
  };

  const addWater = (amount) => {
    setDailyIntake(prev => ({
      ...prev,
      water: prev.water + amount
    }));
  };

  const removeFromHistory = (id) => {
    const entry = mealHistory.find(item => item.id === id);
    if (entry) {
      setDailyIntake(prev => ({
        calories: Math.max(0, prev.calories - entry.nutrition.calories),
        protein: Math.max(0, prev.protein - entry.nutrition.protein),
        carbs: Math.max(0, prev.carbs - entry.nutrition.carbs),
        fat: Math.max(0, prev.fat - entry.nutrition.fat),
        fiber: Math.max(0, prev.fiber - entry.nutrition.fiber),
        water: prev.water
      }));
      setMealHistory(prev => prev.filter(item => item.id !== id));
    }
  };

  const filteredFoods = Object.entries(indianFoods).filter(([food]) =>
    food.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dailyNeeds = calculateDailyNeeds();

  const macroData = [
    { name: 'Protein', value: dailyIntake.protein, color: '#10B981' },
    { name: 'Carbs', value: dailyIntake.carbs, color: '#3B82F6' },
    { name: 'Fat', value: dailyIntake.fat, color: '#F59E0B' }
  ];

  const progressData = dailyNeeds ? [
    { 
      name: 'Calories', 
      current: dailyIntake.calories, 
      target: dailyNeeds.calories,
      percentage: Math.round((dailyIntake.calories / dailyNeeds.calories) * 100)
    },
    { 
      name: 'Protein', 
      current: dailyIntake.protein, 
      target: dailyNeeds.protein,
      percentage: Math.round((dailyIntake.protein / dailyNeeds.protein) * 100)
    },
    { 
      name: 'Carbs', 
      current: dailyIntake.carbs, 
      target: dailyNeeds.carbs,
      percentage: Math.round((dailyIntake.carbs / dailyNeeds.carbs) * 100)
    },
    { 
      name: 'Fat', 
      current: dailyIntake.fat, 
      target: dailyNeeds.fat,
      percentage: Math.round((dailyIntake.fat / dailyNeeds.fat) * 100)
    }
  ] : [];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Advanced Nutrition Tracker</h2>
        <p className="text-gray-300">Comprehensive nutrition tracking with Indian food database</p>
      </div>

      {/* User Profile */}
      <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
        <h3 className="text-lg font-semibold text-white mb-4">Profile Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
            <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
            <select
              value={userProfile.gender}
              onChange={(e) => setUserProfile({ ...userProfile, gender: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
            <input
              type="number"
              value={userProfile.weight}
              onChange={(e) => setUserProfile({ ...userProfile, weight: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
            <input
              type="number"
              value={userProfile.height}
              onChange={(e) => setUserProfile({ ...userProfile, height: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Activity Level</label>
            <select
              value={userProfile.activity}
              onChange={(e) => setUserProfile({ ...userProfile, activity: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Light Activity</option>
              <option value="moderate">Moderate Activity</option>
              <option value="active">Active</option>
              <option value="very_active">Very Active</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Water Intake */}
      <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
        <h3 className="text-lg font-semibold text-white mb-4">Water Intake</h3>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => addWater(250)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
            >
              +250ml
            </button>
            <button
              onClick={() => addWater(500)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
            >
              +500ml
            </button>
            <button
              onClick={() => addWater(1000)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
            >
              +1L
            </button>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-400">{dailyIntake.water}ml</div>
            <div className="text-sm text-gray-400">
              {dailyNeeds && `/ ${dailyNeeds.water}ml`}
            </div>
          </div>
        </div>
      </div>

      {/* Food Search and Quick Add */}
      <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Quick Add Foods</h3>
          <div className="flex gap-2">
            <select
              value={selectedMeal}
              onChange={(e) => setSelectedMeal(e.target.value)}
              className="px-3 py-1 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search foods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
          {filteredFoods.map(([food, nutrition]) => (
            <button
              key={food}
              onClick={() => addFood(food, nutrition)}
              className="p-3 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600/50 hover:border-gray-500/50 rounded-lg text-gray-300 hover:text-white transition-all duration-300 text-sm text-left"
            >
              <div className="font-medium">{food}</div>
              <div className="text-xs text-gray-400">{nutrition.calories} cal</div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Food Entry */}
      <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
        <h3 className="text-lg font-semibold text-white mb-4">Add Custom Food</h3>
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Food Name</label>
            <input
              type="text"
              value={foodItem.name}
              onChange={(e) => setFoodItem({ ...foodItem, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Quantity</label>
            <input
              type="number"
              step="0.1"
              value={foodItem.quantity}
              onChange={(e) => setFoodItem({ ...foodItem, quantity: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Calories</label>
            <input
              type="number"
              value={foodItem.calories}
              onChange={(e) => setFoodItem({ ...foodItem, calories: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Protein (g)</label>
            <input
              type="number"
              value={foodItem.protein}
              onChange={(e) => setFoodItem({ ...foodItem, protein: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Carbs (g)</label>
            <input
              type="number"
              value={foodItem.carbs}
              onChange={(e) => setFoodItem({ ...foodItem, carbs: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Fat (g)</label>
            <input
              type="number"
              value={foodItem.fat}
              onChange={(e) => setFoodItem({ ...foodItem, fat: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Fiber (g)</label>
            <input
              type="number"
              value={foodItem.fiber}
              onChange={(e) => setFoodItem({ ...foodItem, fiber: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={addCustomFood}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Add Food
          </button>
        </div>
      </div>

      {/* Progress Charts */}
      {dailyNeeds && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Macro Distribution */}
          <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
            <h3 className="text-xl font-semibold text-white mb-4">Macro Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}g`}
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Progress vs Targets */}
          <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
            <h3 className="text-xl font-semibold text-white mb-4">Progress vs Targets</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="current" fill="#3B82F6" name="Current" />
                <Bar dataKey="target" fill="#10B981" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Daily Summary with Progress Bars */}
      <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
        <h3 className="text-xl font-semibold text-white mb-4">Today's Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {progressData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">{item.name}</span>
                <span className="text-sm text-gray-400">{item.percentage}%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    item.percentage >= 100 ? 'bg-green-500' : 
                    item.percentage >= 75 ? 'bg-blue-500' : 
                    item.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(item.percentage, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-400 font-semibold">{item.current}</span>
                <span className="text-gray-400">/ {item.target}</span>
              </div>
            </div>
          ))}
          
          {/* Water Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Water</span>
              <span className="text-sm text-gray-400">
                {dailyNeeds ? Math.round((dailyIntake.water / dailyNeeds.water) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-blue-400 transition-all duration-500"
                style={{ 
                  width: `${dailyNeeds ? Math.min((dailyIntake.water / dailyNeeds.water) * 100, 100) : 0}%` 
                }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-400 font-semibold">{dailyIntake.water}ml</span>
              <span className="text-gray-400">/ {dailyNeeds?.water || 0}ml</span>
            </div>
          </div>

          {/* Fiber Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Fiber</span>
              <span className="text-sm text-gray-400">
                {dailyNeeds ? Math.round((dailyIntake.fiber / dailyNeeds.fiber) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-green-400 transition-all duration-500"
                style={{ 
                  width: `${dailyNeeds ? Math.min((dailyIntake.fiber / dailyNeeds.fiber) * 100, 100) : 0}%` 
                }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-400 font-semibold">{dailyIntake.fiber.toFixed(1)}g</span>
              <span className="text-gray-400">/ {dailyNeeds?.fiber || 0}g</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setDailyIntake({ calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, water: 0 })}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
          >
            Reset Day
          </button>
          <button
            onClick={() => setMealHistory([])}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-300"
          >
            Clear History
          </button>
        </div>
      </div>

      {/* Meal History */}
      {mealHistory.length > 0 && (
        <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
          <h3 className="text-xl font-semibold text-white mb-4">Today's Meals</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {mealHistory.slice(0, 10).map((entry) => (
              <div key={entry.id} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{entry.name}</span>
                    <span className="text-xs px-2 py-1 bg-blue-600/20 text-blue-300 rounded-full">
                      {entry.meal}
                    </span>
                    {entry.quantity !== 1 && (
                      <span className="text-xs text-gray-400">x{entry.quantity}</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">
                    {entry.nutrition.calories.toFixed(0)} cal, {entry.nutrition.protein.toFixed(1)}g protein
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{entry.time}</span>
                  <button
                    onClick={() => removeFromHistory(entry.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nutrition Tips */}
      <div className="bg-green-600/20 border border-green-500/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-green-300 mb-3">Nutrition Tips:</h3>
        <ul className="text-green-200 text-sm space-y-2">
          <li>• Aim for 1.6-2.2g protein per kg body weight for optimal health</li>
          <li>• Include fiber-rich foods like dal, vegetables, and fruits</li>
          <li>• Stay hydrated with 35ml water per kg body weight daily</li>
          <li>• Balance your macros: 45% carbs, 30% fat, 25% protein</li>
          <li>• Eat a variety of colorful vegetables and fruits</li>
          <li>• Choose whole grains over refined grains when possible</li>
        </ul>
      </div>
    </div>
  );
};

export default NutritionTracker;
