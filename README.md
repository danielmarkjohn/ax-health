# Health & Fitness Tracker

A comprehensive React-based health and fitness tracking application with multiple calculators and trackers to monitor your wellness journey.

## Features

### Calculators
- **BMI Calculator** - Calculate Body Mass Index with health category indicators
- **Calorie Calculator** - Estimate daily caloric needs based on activity level
- **Body Fat Calculator** - Calculate body fat percentage using various methods
- **Heart Rate Zones** - Determine optimal heart rate zones for different activities
- **Blood Pressure Tracker** - Monitor and track blood pressure readings
- **Diabetes Risk Calculator** - Assess diabetes risk factors

### Trackers
- **Sleep Tracker** - Monitor sleep quality, duration, and patterns with insights
- **Nutrition Tracker** - Track daily macronutrients and caloric intake
- **Water Tracker** - Monitor daily water consumption

### Health Charts
- **Growth Chart** - Track growth patterns over time
- **WHO BMI Chart** - World Health Organization BMI reference charts
- **Immunization Schedule** - Keep track of vaccination schedules

## Technologies Used

- **React** with TypeScript
- **Recharts** for data visualization
- **Tailwind CSS** for styling
- **Local Storage** for data persistence

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd health-fitness-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

### Sleep Tracker
- Set your sleep goals and target bedtime
- Log daily sleep data including bedtime, wake time, quality, and mood
- Track factors affecting sleep like caffeine intake, screen time, and stress
- View sleep trends and get personalized insights
- Monitor 7-day averages and sleep scores

### Nutrition Tracker
- Set up your profile for personalized caloric needs
- Track daily intake of calories, protein, carbs, fat, and fiber
- Add foods from the built-in database or create custom entries
- Monitor macro distribution with visual charts
- View meal history and progress toward daily goals

### Water Tracker
- Set personalized hydration goals based on weight and activity
- Track daily water intake in glasses (8 oz each)
- Visual progress indicator showing percentage of daily goal

## Data Storage

All user data is stored locally in the browser's localStorage, ensuring privacy and offline functionality. Data persists between sessions but remains on your device.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and modern web technologies
- Charts powered by Recharts library
- Styled with Tailwind CSS
- Health calculations based on established medical formulas
