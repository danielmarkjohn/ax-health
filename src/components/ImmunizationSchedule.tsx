import React, { useState } from 'react';

const ImmunizationSchedule = () => {
  const [childAge, setChildAge] = useState('');
  const [completedVaccines, setCompletedVaccines] = useState(new Set());

  // Indian Immunization Schedule as per WHO and IAP guidelines
  const immunizationSchedule = [
    {
      age: 'Birth',
      vaccines: [
        { name: 'BCG', fullName: 'Bacillus Calmette-Guérin', protects: 'Tuberculosis' },
        { name: 'OPV-0', fullName: 'Oral Polio Vaccine (Birth dose)', protects: 'Poliomyelitis' },
        { name: 'Hepatitis B-1', fullName: 'Hepatitis B (1st dose)', protects: 'Hepatitis B' }
      ]
    },
    {
      age: '6 weeks',
      vaccines: [
        { name: 'OPV-1', fullName: 'Oral Polio Vaccine (1st dose)', protects: 'Poliomyelitis' },
        { name: 'DPT-1', fullName: 'Diphtheria, Pertussis, Tetanus (1st dose)', protects: 'Diphtheria, Whooping cough, Tetanus' },
        { name: 'Hepatitis B-2', fullName: 'Hepatitis B (2nd dose)', protects: 'Hepatitis B' },
        { name: 'Hib-1', fullName: 'Haemophilus influenzae type b (1st dose)', protects: 'Meningitis, Pneumonia' },
        { name: 'PCV-1', fullName: 'Pneumococcal Conjugate Vaccine (1st dose)', protects: 'Pneumonia, Meningitis' },
        { name: 'Rotavirus-1', fullName: 'Rotavirus Vaccine (1st dose)', protects: 'Severe diarrhea' }
      ]
    },
    {
      age: '10 weeks',
      vaccines: [
        { name: 'OPV-2', fullName: 'Oral Polio Vaccine (2nd dose)', protects: 'Poliomyelitis' },
        { name: 'DPT-2', fullName: 'Diphtheria, Pertussis, Tetanus (2nd dose)', protects: 'Diphtheria, Whooping cough, Tetanus' },
        { name: 'Hib-2', fullName: 'Haemophilus influenzae type b (2nd dose)', protects: 'Meningitis, Pneumonia' },
        { name: 'PCV-2', fullName: 'Pneumococcal Conjugate Vaccine (2nd dose)', protects: 'Pneumonia, Meningitis' },
        { name: 'Rotavirus-2', fullName: 'Rotavirus Vaccine (2nd dose)', protects: 'Severe diarrhea' }
      ]
    },
    {
      age: '14 weeks',
      vaccines: [
        { name: 'OPV-3', fullName: 'Oral Polio Vaccine (3rd dose)', protects: 'Poliomyelitis' },
        { name: 'DPT-3', fullName: 'Diphtheria, Pertussis, Tetanus (3rd dose)', protects: 'Diphtheria, Whooping cough, Tetanus' },
        { name: 'Hepatitis B-3', fullName: 'Hepatitis B (3rd dose)', protects: 'Hepatitis B' },
        { name: 'Hib-3', fullName: 'Haemophilus influenzae type b (3rd dose)', protects: 'Meningitis, Pneumonia' },
        { name: 'PCV-3', fullName: 'Pneumococcal Conjugate Vaccine (3rd dose)', protects: 'Pneumonia, Meningitis' },
        { name: 'Rotavirus-3', fullName: 'Rotavirus Vaccine (3rd dose)', protects: 'Severe diarrhea' }
      ]
    },
    {
      age: '9 months',
      vaccines: [
        { name: 'Measles-1', fullName: 'Measles Vaccine (1st dose)', protects: 'Measles' },
        { name: 'Vitamin A-1', fullName: 'Vitamin A Supplementation (1st dose)', protects: 'Vitamin A deficiency' }
      ]
    },
    {
      age: '12 months',
      vaccines: [
        { name: 'MMR-1', fullName: 'Measles, Mumps, Rubella (1st dose)', protects: 'Measles, Mumps, Rubella' },
        { name: 'Typhoid', fullName: 'Typhoid Conjugate Vaccine', protects: 'Typhoid fever' },
        { name: 'Hepatitis A-1', fullName: 'Hepatitis A (1st dose)', protects: 'Hepatitis A' }
      ]
    },
    {
      age: '15 months',
      vaccines: [
        { name: 'PCV Booster', fullName: 'Pneumococcal Conjugate Vaccine (Booster)', protects: 'Pneumonia, Meningitis' },
        { name: 'Varicella-1', fullName: 'Varicella Vaccine (1st dose)', protects: 'Chickenpox' }
      ]
    },
    {
      age: '16-18 months',
      vaccines: [
        { name: 'DPT Booster-1', fullName: 'DPT (1st Booster)', protects: 'Diphtheria, Whooping cough, Tetanus' },
        { name: 'OPV Booster', fullName: 'OPV (Booster)', protects: 'Poliomyelitis' },
        { name: 'Hib Booster', fullName: 'Hib (Booster)', protects: 'Meningitis, Pneumonia' },
        { name: 'MMR-2', fullName: 'MMR (2nd dose)', protects: 'Measles, Mumps, Rubella' },
        { name: 'Vitamin A-2', fullName: 'Vitamin A Supplementation (2nd dose)', protects: 'Vitamin A deficiency' }
      ]
    },
    {
      age: '18 months',
      vaccines: [
        { name: 'Hepatitis A-2', fullName: 'Hepatitis A (2nd dose)', protects: 'Hepatitis A' }
      ]
    },
    {
      age: '4-6 years',
      vaccines: [
        { name: 'DPT Booster-2', fullName: 'DPT (2nd Booster)', protects: 'Diphtheria, Whooping cough, Tetanus' },
        { name: 'OPV Booster-2', fullName: 'OPV (2nd Booster)', protects: 'Poliomyelitis' },
        { name: 'Varicella-2', fullName: 'Varicella (2nd dose)', protects: 'Chickenpox' }
      ]
    },
    {
      age: '10-12 years',
      vaccines: [
        { name: 'Td', fullName: 'Tetanus-Diphtheria', protects: 'Tetanus, Diphtheria' },
        { name: 'HPV', fullName: 'Human Papillomavirus (for girls)', protects: 'Cervical cancer' }
      ]
    }
  ];

  const toggleVaccine = (vaccineName) => {
    const newCompleted = new Set(completedVaccines);
    if (newCompleted.has(vaccineName)) {
      newCompleted.delete(vaccineName);
    } else {
      newCompleted.add(vaccineName);
    }
    setCompletedVaccines(newCompleted);
  };

  const getAgeInWeeks = (ageString) => {
    if (ageString === 'Birth') return 0;
    if (ageString.includes('weeks')) return parseInt(ageString);
    if (ageString.includes('months')) return parseInt(ageString) * 4.33;
    if (ageString.includes('years')) return parseInt(ageString) * 52;
    return 0;
  };

  const isVaccineDue = (scheduleAge) => {
    if (!childAge) return false;
    const currentAgeWeeks = parseFloat(childAge);
    const scheduleAgeWeeks = getAgeInWeeks(scheduleAge);
    return currentAgeWeeks >= scheduleAgeWeeks;
  };

  const getCompletionPercentage = () => {
    const totalVaccines = immunizationSchedule.reduce((total, schedule) => total + schedule.vaccines.length, 0);
    return Math.round((completedVaccines.size / totalVaccines) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Immunization Schedule</h2>
        <p className="text-gray-300">WHO & IAP recommended vaccination schedule for Indian children</p>
      </div>

      {/* Child Age Input */}
      <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-600/50">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">Child's Age (in weeks)</label>
            <input
              type="number"
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Enter age in weeks"
            />
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{getCompletionPercentage()}%</div>
            <div className="text-sm text-gray-400">Complete</div>
          </div>
        </div>
      </div>

      {/* Immunization Schedule */}
      <div className="space-y-4">
        {immunizationSchedule.map((schedule, index) => (
          <div
            key={index}
            className={`bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm border transition-all duration-300 ${
              isVaccineDue(schedule.age)
                ? 'border-blue-500/50 shadow-lg shadow-blue-500/10'
                : 'border-gray-600/50'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">{schedule.age}</h3>
              {isVaccineDue(schedule.age) && (
                <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">Due</span>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schedule.vaccines.map((vaccine, vIndex) => (
                <div
                  key={vIndex}
                  className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                    completedVaccines.has(vaccine.name)
                      ? 'bg-green-600/20 border-green-500/50 text-green-300'
                      : 'bg-gray-800/50 border-gray-600/50 text-gray-300 hover:border-gray-500/50'
                  }`}
                  onClick={() => toggleVaccine(vaccine.name)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{vaccine.name}</h4>
                      <p className="text-sm opacity-80 mt-1">{vaccine.fullName}</p>
                      <p className="text-xs opacity-60 mt-2">Protects against: {vaccine.protects}</p>
                    </div>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      completedVaccines.has(vaccine.name)
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-500'
                    }`}>
                      {completedVaccines.has(vaccine.name) && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-600/20 border border-yellow-500/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-yellow-300 mb-3">Important Notes:</h3>
        <ul className="text-yellow-200 text-sm space-y-2">
          <li>• Always consult with your pediatrician before vaccination</li>
          <li>• Some vaccines may have contraindications based on health conditions</li>
          <li>• Keep vaccination records safe and updated</li>
          <li>• Report any adverse reactions to healthcare provider immediately</li>
          <li>• This schedule follows WHO and Indian Academy of Pediatrics guidelines</li>
        </ul>
      </div>
    </div>
  );
};

export default ImmunizationSchedule;