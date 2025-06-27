import { supabase } from '../lib/supabase';
import { UserProfile, CareerPlan } from '../types';
import { 
  generateMockCareerRecommendations, 
  generateMockSkillRecommendations, 
  generateMockLearningPlan 
} from './mockData';

export const saveCareerPlan = async (userId: string, profile: UserProfile): Promise<CareerPlan> => {
  // Generate AI recommendations (using mock data for now)
  const careerRecommendations = generateMockCareerRecommendations(profile.interests);
  const skillRecommendations = generateMockSkillRecommendations();
  const learningPlan = generateMockLearningPlan();
  
  const careerPlan: CareerPlan = {
    userId,
    userProfile: profile,
    careerRecommendations,
    skillRecommendations,
    learningPlan,
    createdAt: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase
      .from('career_plans')
      .insert([{
        user_id: userId,
        user_profile: profile,
        career_recommendations: careerRecommendations,
        skill_recommendations: skillRecommendations,
        learning_plan: learningPlan,
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
      createdAt: plan.created_at
    }));
  } catch (error) {
    console.error('Error fetching career plans:', error);
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