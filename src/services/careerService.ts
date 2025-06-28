import { supabase } from '../lib/supabase';
import { UserProfile, CareerPlan } from '../types';
import { generateCareerPlan } from './apiService';

export const saveCareerPlan = async (userId: string, profile: UserProfile): Promise<CareerPlan> => {
  try {
    // Generate AI recommendations using the backend function
    const aiResponse = await generateCareerPlan(profile);
    
    const careerPlan: CareerPlan = {
      userId,
      userProfile: profile,
      careerRecommendations: aiResponse.careerRecommendations,
      skillRecommendations: aiResponse.skillRecommendations,
      learningPlan: aiResponse.learningPlan,
      createdAt: new Date().toISOString()
    };

    // Save to database
    const { data, error } = await supabase
      .from('career_plans')
      .insert([{
        user_id: userId,
        title: `Career Plan for ${profile.name}`,
        user_profile: profile,
        career_recommendations: aiResponse.careerRecommendations,
        skill_recommendations: aiResponse.skillRecommendations,
        learning_plan: aiResponse.learningPlan,
        created_at: careerPlan.createdAt
      }])
      .select()
      .single();

    if (error) throw error;
    
    return {
      ...careerPlan,
      id: data.id
    };
  } catch (error) {
    console.error('Error saving career plan:', error);
    throw error;
  }
};

export const getUserCareerPlans = async (userId: string): Promise<CareerPlan[]> => {
  try {
    const { data, error } = await supabase
      .from('career_plans')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data.map(plan => ({
      id: plan.id,
      userId: plan.user_id,
      userProfile: plan.user_profile,
      careerRecommendations: plan.career_recommendations,
      skillRecommendations: plan.skill_recommendations,
      learningPlan: plan.learning_plan,
      createdAt: plan.created_at,
      title: plan.title,
      status: plan.status,
      progressPercentage: plan.progress_percentage,
      isFavorite: plan.is_favorite
    }));
  } catch (error) {
    console.error('Error fetching career plans:', error);
    throw error;
  }
};

export const updateCareerPlan = async (planId: string, updates: Partial<CareerPlan>): Promise<void> => {
  try {
    const { error } = await supabase
      .from('career_plans')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', planId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating career plan:', error);
    throw error;
  }
};

export const deleteCareerPlan = async (planId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('career_plans')
      .delete()
      .eq('id', planId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting career plan:', error);
    throw error;
  }
};

export const toggleFavorite = async (planId: string, isFavorite: boolean): Promise<void> => {
  try {
    const { error } = await supabase
      .from('career_plans')
      .update({ is_favorite: isFavorite })
      .eq('id', planId);

    if (error) throw error;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};