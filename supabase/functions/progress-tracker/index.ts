import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabase.auth.getUser(token)

    if (!user) {
      throw new Error('Unauthorized')
    }

    const url = new URL(req.url)
    const method = req.method

    if (method === 'GET') {
      // Get user progress
      const careerPlanId = url.searchParams.get('career_plan_id')
      
      const { data: progress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('career_plan_id', careerPlanId)

      return new Response(
        JSON.stringify({ progress }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

    if (method === 'POST') {
      // Update progress
      const { careerPlanId, taskId, taskType, completed, notes } = await req.json()

      const progressData = {
        user_id: user.id,
        career_plan_id: careerPlanId,
        task_id: taskId,
        task_type: taskType,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
        notes
      }

      const { data, error } = await supabase
        .from('user_progress')
        .upsert(progressData, { onConflict: 'career_plan_id,task_id' })
        .select()

      if (error) throw error

      // Update career plan progress percentage
      await updateCareerPlanProgress(supabase, careerPlanId, user.id)

      // Log analytics
      await supabase.from('analytics').insert({
        event_type: 'task_completed',
        event_data: {
          task_id: taskId,
          task_type: taskType,
          completed
        },
        user_id: user.id
      })

      return new Response(
        JSON.stringify({ progress: data }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

    return new Response('Method not allowed', { status: 405 })

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

async function updateCareerPlanProgress(supabase: any, careerPlanId: string, userId: string) {
  // Get total tasks for this career plan
  const { data: careerPlan } = await supabase
    .from('career_plans')
    .select('learning_plan')
    .eq('id', careerPlanId)
    .eq('user_id', userId)
    .single()

  if (!careerPlan) return

  // Count total tasks in learning plan
  const totalTasks = careerPlan.learning_plan.reduce((total: number, week: any) => {
    return total + (week.tasks?.length || 0)
  }, 0)

  // Get completed tasks count
  const { count: completedTasks } = await supabase
    .from('user_progress')
    .select('*', { count: 'exact', head: true })
    .eq('career_plan_id', careerPlanId)
    .eq('user_id', userId)
    .eq('completed', true)

  // Calculate progress percentage
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Update career plan
  await supabase
    .from('career_plans')
    .update({ 
      progress_percentage: progressPercentage,
      status: progressPercentage === 100 ? 'completed' : 'active'
    })
    .eq('id', careerPlanId)
    .eq('user_id', userId)
}