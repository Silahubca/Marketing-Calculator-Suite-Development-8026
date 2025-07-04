import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getSavedCalculations, saveCalculation as saveCalc, deleteCalculation as deleteCalc, clearAllCalculations as clearAll } from '../utils/storageUtils';

const CalculationContext = createContext();

export const useCalculations = () => {
  const context = useContext(CalculationContext);
  if (!context) {
    throw new Error('useCalculations must be used within a CalculationProvider');
  }
  return context;
};

export const CalculationProvider = ({ children }) => {
  const [calculations, setCalculations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Load calculations function
  const loadCalculations = useCallback(() => {
    try {
      console.log('🔄 CalculationContext: Loading calculations...');
      const saved = getSavedCalculations();
      console.log('📊 CalculationContext: Loaded', saved.length, 'calculations');
      setCalculations(saved);
      setLastUpdate(Date.now());
      return saved;
    } catch (error) {
      console.error('❌ CalculationContext: Error loading calculations:', error);
      setCalculations([]);
      return [];
    }
  }, []);

  // Enhanced save function
  const saveCalculation = useCallback((calculatorId, inputs, results, calculatorName) => {
    console.log('💾 CalculationContext: Saving calculation:', calculatorName);
    
    try {
      const result = saveCalc(calculatorId, inputs, results, calculatorName);
      if (result) {
        // Immediate state update
        const updated = loadCalculations();
        console.log('✅ CalculationContext: Saved and updated state with', updated.length, 'calculations');
        return result;
      }
      return null;
    } catch (error) {
      console.error('❌ CalculationContext: Error saving calculation:', error);
      return null;
    }
  }, [loadCalculations]);

  // Enhanced delete function
  const deleteCalculation = useCallback((calculationId) => {
    console.log('🗑️ CalculationContext: Deleting calculation:', calculationId);
    
    try {
      const result = deleteCalc(calculationId);
      if (result) {
        const updated = loadCalculations();
        console.log('✅ CalculationContext: Deleted and updated state with', updated.length, 'calculations');
        return result;
      }
      return false;
    } catch (error) {
      console.error('❌ CalculationContext: Error deleting calculation:', error);
      return false;
    }
  }, [loadCalculations]);

  // Enhanced clear function
  const clearAllCalculations = useCallback(() => {
    console.log('🧹 CalculationContext: Clearing all calculations');
    
    try {
      const result = clearAll();
      if (result) {
        setCalculations([]);
        setLastUpdate(Date.now());
        console.log('✅ CalculationContext: Cleared all calculations');
        return result;
      }
      return false;
    } catch (error) {
      console.error('❌ CalculationContext: Error clearing calculations:', error);
      return false;
    }
  }, []);

  // Force refresh function
  const forceRefresh = useCallback(() => {
    console.log('🔄 CalculationContext: Force refresh triggered');
    const updated = loadCalculations();
    console.log('✅ CalculationContext: Force refresh completed with', updated.length, 'calculations');
  }, [loadCalculations]);

  // Initial load and event listeners
  useEffect(() => {
    console.log('🚀 CalculationContext: Initial setup');
    
    // Initial load
    loadCalculations();
    setIsLoading(false);

    // Enhanced event listeners
    const handleStorageChange = (e) => {
      if (e.key === 'marketing_calculations') {
        console.log('📦 CalculationContext: Storage change detected via storage event');
        loadCalculations();
      }
    };

    const handleCustomEvent = (e) => {
      console.log('📦 CalculationContext: Custom calculator update event detected');
      loadCalculations();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('👁️ CalculationContext: Page became visible, refreshing...');
        loadCalculations();
      }
    };

    const handleFocus = () => {
      console.log('👁️ CalculationContext: Window focused, refreshing...');
      loadCalculations();
    };

    // Add all event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('calculatorUpdate', handleCustomEvent);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    // Periodic refresh (every 5 seconds when active)
    const intervalId = setInterval(() => {
      if (!document.hidden) {
        console.log('⏰ CalculationContext: Periodic refresh');
        loadCalculations();
      }
    }, 5000);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('calculatorUpdate', handleCustomEvent);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      clearInterval(intervalId);
      console.log('🧹 CalculationContext: Cleanup completed');
    };
  }, [loadCalculations]);

  // Debug logging
  useEffect(() => {
    console.log('🎯 CalculationContext: State updated:', {
      calculationsCount: calculations.length,
      isLoading,
      lastUpdate: new Date(lastUpdate).toLocaleTimeString(),
      firstCalculation: calculations[0]?.calculatorName || 'None'
    });
  }, [calculations, isLoading, lastUpdate]);

  const value = {
    calculations,
    isLoading,
    lastUpdate,
    saveCalculation,
    deleteCalculation,
    clearAllCalculations,
    forceRefresh,
    loadCalculations
  };

  return (
    <CalculationContext.Provider value={value}>
      {children}
    </CalculationContext.Provider>
  );
};