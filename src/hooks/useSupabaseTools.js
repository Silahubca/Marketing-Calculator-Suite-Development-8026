import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';

export const useSupabaseTools = () => {
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('tool_categories_mc847k')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.message);
    }
  };

  const fetchTools = async () => {
    try {
      const { data, error } = await supabase
        .from('marketing_tools_mc847k')
        .select(`
          *,
          category:tool_categories_mc847k(*)
        `)
        .eq('is_active', true)
        .order('rating', { ascending: false });
      
      if (error) throw error;
      setTools(data || []);
    } catch (err) {
      console.error('Error fetching tools:', err);
      setError(err.message);
    }
  };

  const addTool = async (toolData) => {
    try {
      const { data, error } = await supabase
        .from('marketing_tools_mc847k')
        .insert([toolData])
        .select()
        .single();
      
      if (error) throw error;
      await fetchTools(); // Refresh tools
      return data;
    } catch (err) {
      console.error('Error adding tool:', err);
      throw err;
    }
  };

  const updateTool = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('marketing_tools_mc847k')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      await fetchTools(); // Refresh tools
      return data;
    } catch (err) {
      console.error('Error updating tool:', err);
      throw err;
    }
  };

  const deleteTool = async (id) => {
    try {
      const { error } = await supabase
        .from('marketing_tools_mc847k')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
      await fetchTools(); // Refresh tools
    } catch (err) {
      console.error('Error deleting tool:', err);
      throw err;
    }
  };

  const trackClick = async (toolId, clickType) => {
    try {
      await supabase
        .from('tool_clicks_mc847k')
        .insert([{
          tool_id: toolId,
          click_type: clickType,
          user_agent: navigator.userAgent,
          referrer: document.referrer
        }]);
    } catch (err) {
      console.error('Error tracking click:', err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchCategories(), fetchTools()]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    tools,
    categories,
    loading,
    error,
    fetchTools,
    fetchCategories,
    addTool,
    updateTool,
    deleteTool,
    trackClick
  };
};

export const useToolRatings = (toolId) => {
  const [ratings, setRatings] = useState([]);
  const [userRating, setUserRating] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRatings = async () => {
    try {
      const { data, error } = await supabase
        .from('tool_ratings_mc847k')
        .select('*')
        .eq('tool_id', toolId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setRatings(data || []);
    } catch (err) {
      console.error('Error fetching ratings:', err);
    }
  };

  const submitRating = async (rating, reviewText = '') => {
    try {
      const sessionId = localStorage.getItem('session_id') || 
        (() => {
          const id = Math.random().toString(36).substring(2, 15);
          localStorage.setItem('session_id', id);
          return id;
        })();

      const { data, error } = await supabase
        .from('tool_ratings_mc847k')
        .upsert([{
          tool_id: toolId,
          session_id: sessionId,
          rating,
          review_text: reviewText
        }], {
          onConflict: 'tool_id,session_id'
        })
        .select()
        .single();
      
      if (error) throw error;
      
      setUserRating(data);
      await fetchRatings();
      return data;
    } catch (err) {
      console.error('Error submitting rating:', err);
      throw err;
    }
  };

  const getUserRating = async () => {
    try {
      const sessionId = localStorage.getItem('session_id');
      if (!sessionId) return;

      const { data, error } = await supabase
        .from('tool_ratings_mc847k')
        .select('*')
        .eq('tool_id', toolId)
        .eq('session_id', sessionId)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      setUserRating(data);
    } catch (err) {
      console.error('Error fetching user rating:', err);
    }
  };

  useEffect(() => {
    if (toolId) {
      const loadData = async () => {
        setLoading(true);
        await Promise.all([fetchRatings(), getUserRating()]);
        setLoading(false);
      };
      loadData();
    }
  }, [toolId]);

  return {
    ratings,
    userRating,
    loading,
    submitRating,
    fetchRatings
  };
};