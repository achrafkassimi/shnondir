import { supabase } from '../lib/supabase';

const API_BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

// Helper function to get auth headers
const getAuthHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return {
    'Authorization': `Bearer ${session?.access_token}`,
    'Content-Type': 'application/json',
  };
};

// Career Plan Generation
export const generateCareerPlan = async (userProfile: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-career-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userProfile }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate career plan');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating career plan:', error);
    throw error;
  }
};

// Analytics
export const getAnalytics = async (type: string = 'overview') => {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics?type=${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch analytics');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

// CV Generation
export const generateCV = async (userProfile: any, careerPath: string, templateId?: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cv-generator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userProfile, careerPath, templateId }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate CV');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating CV:', error);
    throw error;
  }
};

// Progress Tracking
export const getProgress = async (careerPlanId: string) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/progress-tracker?career_plan_id=${careerPlanId}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch progress');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching progress:', error);
    throw error;
  }
};

export const updateProgress = async (careerPlanId: string, taskId: string, taskType: string, completed: boolean, notes?: string) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/progress-tracker`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        careerPlanId,
        taskId,
        taskType,
        completed,
        notes,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update progress');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating progress:', error);
    throw error;
  }
};

// Learning Resources
export const getLearningResources = async (skillTags?: string[]) => {
  try {
    let query = supabase.from('learning_resources').select('*');
    
    if (skillTags && skillTags.length > 0) {
      query = query.overlaps('skill_tags', skillTags);
    }
    
    const { data, error } = await query.order('rating', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching learning resources:', error);
    throw error;
  }
};

// CV Templates
export const getCVTemplates = async () => {
  try {
    const { data, error } = await supabase
      .from('cv_templates')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching CV templates:', error);
    throw error;
  }
};

// Career Insights
export const getCareerInsights = async (careerTitle?: string) => {
  try {
    let query = supabase.from('career_insights').select('*');
    
    if (careerTitle) {
      query = query.eq('career_title', careerTitle);
    }
    
    const { data, error } = await query.order('growth_rate', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching career insights:', error);
    throw error;
  }
};

// User Profile Management
export const updateUserProfile = async (userId: string, profileData: any) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .upsert({
        id: userId,
        ...profileData,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};