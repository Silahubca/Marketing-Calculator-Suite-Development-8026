// Local storage utilities for saving calculations
export const STORAGE_KEYS = {
  CALCULATIONS: 'marketing_calculations',
  USER_PREFERENCES: 'user_preferences'
};

export const saveCalculation = (calculatorId, inputs, results, calculatorName) => {
  try {
    const calculation = {
      id: generateId(),
      calculatorId,
      calculatorName,
      inputs,
      results,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString()
    };

    const savedCalculations = getSavedCalculations();
    savedCalculations.unshift(calculation); // Add to beginning

    // Keep only last 100 calculations to prevent storage overflow
    const limitedCalculations = savedCalculations.slice(0, 100);
    
    localStorage.setItem(STORAGE_KEYS.CALCULATIONS, JSON.stringify(limitedCalculations));
    
    // Trigger storage event manually for same-window updates
    window.dispatchEvent(new StorageEvent('storage', {
      key: STORAGE_KEYS.CALCULATIONS,
      newValue: JSON.stringify(limitedCalculations),
      url: window.location.href
    }));
    
    console.log('Calculation saved:', calculation);
    return calculation;
  } catch (error) {
    console.error('Error saving calculation:', error);
    return null;
  }
};

export const getSavedCalculations = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CALCULATIONS);
    const calculations = saved ? JSON.parse(saved) : [];
    console.log('Retrieved calculations:', calculations.length);
    return calculations;
  } catch (error) {
    console.error('Error loading saved calculations:', error);
    return [];
  }
};

export const getCalculationsByType = (calculatorId) => {
  const allCalculations = getSavedCalculations();
  return allCalculations.filter(calc => calc.calculatorId === calculatorId);
};

export const deleteCalculation = (calculationId) => {
  try {
    const savedCalculations = getSavedCalculations();
    const filteredCalculations = savedCalculations.filter(calc => calc.id !== calculationId);
    localStorage.setItem(STORAGE_KEYS.CALCULATIONS, JSON.stringify(filteredCalculations));
    
    // Trigger storage event manually for same-window updates
    window.dispatchEvent(new StorageEvent('storage', {
      key: STORAGE_KEYS.CALCULATIONS,
      newValue: JSON.stringify(filteredCalculations),
      url: window.location.href
    }));
    
    console.log('Calculation deleted:', calculationId);
    return true;
  } catch (error) {
    console.error('Error deleting calculation:', error);
    return false;
  }
};

export const clearAllCalculations = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CALCULATIONS);
    
    // Trigger storage event manually for same-window updates
    window.dispatchEvent(new StorageEvent('storage', {
      key: STORAGE_KEYS.CALCULATIONS,
      newValue: null,
      url: window.location.href
    }));
    
    console.log('All calculations cleared');
    return true;
  } catch (error) {
    console.error('Error clearing calculations:', error);
    return false;
  }
};

export const exportCalculationsToCSV = (calculations) => {
  if (!calculations || calculations.length === 0) return;

  try {
    const headers = ['Date', 'Calculator', 'Inputs', 'Results'];
    const rows = calculations.map(calc => [
      calc.date,
      calc.calculatorName,
      JSON.stringify(calc.inputs),
      JSON.stringify(calc.results)
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `marketing_calculations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting to CSV:', error);
  }
};

export const exportCalculationsToPDF = async (calculations) => {
  try {
    const content = calculations.map(calc => {
      return `
Calculator: ${calc.calculatorName}
Date: ${calc.date}

Inputs:
${JSON.stringify(calc.inputs, null, 2)}

Results:
${JSON.stringify(calc.results, null, 2)}

${'='.repeat(50)}
`;
    }).join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `marketing_calculations_${new Date().toISOString().split('T')[0]}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
  }
};

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getUserPreferences = () => {
  try {
    const prefs = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return prefs ? JSON.parse(prefs) : {
      favoriteCalculators: [],
      defaultCurrency: 'USD',
      showTips: true,
      theme: 'light',
      goals: [],
      industry: 'saas',
      dashboardView: 'grid'
    };
  } catch (error) {
    console.error('Error loading user preferences:', error);
    return {
      favoriteCalculators: [],
      defaultCurrency: 'USD',
      showTips: true,
      theme: 'light',
      goals: [],
      industry: 'saas',
      dashboardView: 'grid'
    };
  }
};

export const saveUserPreferences = (preferences) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error('Error saving user preferences:', error);
    return false;
  }
};

// Analytics utilities
export const getCalculationStats = () => {
  const calculations = getSavedCalculations();
  const now = new Date();

  return {
    total: calculations.length,
    thisMonth: calculations.filter(calc => {
      const calcDate = new Date(calc.timestamp);
      return calcDate.getMonth() === now.getMonth() && calcDate.getFullYear() === now.getFullYear();
    }).length,
    thisWeek: calculations.filter(calc => {
      const calcDate = new Date(calc.timestamp);
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return calcDate >= weekAgo;
    }).length,
    uniqueCalculators: new Set(calculations.map(calc => calc.calculatorId)).size
  };
};

export const getMostUsedCalculators = () => {
  const calculations = getSavedCalculations();
  const counts = {};

  calculations.forEach(calc => {
    counts[calc.calculatorId] = (counts[calc.calculatorId] || 0) + 1;
  });

  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([id, count]) => ({
      id,
      name: calculations.find(calc => calc.calculatorId === id)?.calculatorName || id,
      count
    }));
};