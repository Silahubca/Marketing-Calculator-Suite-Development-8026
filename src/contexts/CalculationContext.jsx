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

  // Simple load function
  const loadCalculations = useCallback(() => {
    try {
      const saved = getSavedCalculations();
      console.log('📊 Loading calculations:', saved.length);
      setCalculations(saved);
      setLastUpdate(Date.now());
    } catch (error) {
      console.error('Error loading calculations:', error);
      setCalculations([]);
    }
  }, []);

  // Force refresh function
  const forceRefresh = useCallback(() => {
    console.log('🔄 Force refresh triggered');
    loadCalculations();
  }, [loadCalculations]);

  // Enhanced save function
  const saveCalculation = useCallback((calculatorId, inputs, results, calculatorName) => {
    console.log('💾 Saving calculation:', calculatorName);
    
    const result = saveCalc(calculatorId, inputs, results, calculatorName);
    if (result) {
      // Immediate refresh after save
      loadCalculations();
    }
    return result;
  }, [loadCalculations]);

  // Enhanced delete function
  const deleteCalculation = useCallback((calculationId) => {
    console.log('🗑️ Deleting calculation:', calculationId);
    
    const result = deleteCalc(calculationId);
    if (result) {
      // Immediate refresh after delete
      loadCalculations();
    }
    return result;
  }, [loadCalculations]);

  // Enhanced clear function
  const clearAllCalculations = useCallback(() => {
    console.log('🧹 Clearing all calculations');
    
    const result = clearAll();
    if (result) {
      setCalculations([]);
      setLastUpdate(Date.now());
    }
    return result;
  }, []);

  // Initial load
  useEffect(() => {
    console.log('🚀 Initial load');
    loadCalculations();
    setIsLoading(false);
  }, [loadCalculations]);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'marketing_calculations') {
        console.log('📦 Storage change detected');
        loadCalculations();
      }
    };

    const handleFocus = () => {
      console.log('👁️ Window focused, refreshing...');
      loadCalculations();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [loadCalculations]);

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