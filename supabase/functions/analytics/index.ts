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

    const url = new URL(req.url)
    const type = url.searchParams.get('type') || 'overview'

    let analyticsData = {}

    switch (type) {
      case 'overview':
        analyticsData = await getOverviewAnalytics(supabase)
        break
      case 'career-trends':
        analyticsData = await getCareerTrends(supabase)
        break
      case 'user-engagement':
        analyticsData = await getUserEngagement(supabase)
        break
      default:
        analyticsData = await getOverviewAnalytics(supabase)
    }

    return new Response(
      JSON.stringify(analyticsData),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
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

async function getOverviewAnalytics(supabase: any) {
  // Get total career plans generated
  const { count: totalPlans } = await supabase
    .from('career_plans')
    .select('*', { count: 'exact', head: true })

  // Get total users
  const { count: totalUsers } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })

  // Get plans generated this month
  const thisMonth = new Date()
  thisMonth.setDate(1)
  const { count: monthlyPlans } = await supabase
    .from('career_plans')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', thisMonth.toISOString())

  // Get completion rate
  const { count: completedPlans } = await supabase
    .from('career_plans')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed')

  const completionRate = totalPlans > 0 ? Math.round((completedPlans / totalPlans) * 100) : 0

  return {
    totalPlans: totalPlans || 0,
    totalUsers: totalUsers || 0,
    monthlyPlans: monthlyPlans || 0,
    completionRate,
    growthRate: '+12%' // This would be calculated from historical data
  }
}

async function getCareerTrends(supabase: any) {
  // Get most popular career paths from analytics
  const { data: careerEvents } = await supabase
    .from('analytics')
    .select('event_data')
    .eq('event_type', 'career_plan_generated')
    .order('created_at', { ascending: false })
    .limit(1000)

  const careerCounts: { [key: string]: number } = {}
  
  careerEvents?.forEach((event: any) => {
    const careerPaths = event.event_data?.career_paths || []
    careerPaths.forEach((career: string) => {
      careerCounts[career] = (careerCounts[career] || 0) + 1
    })
  })

  const popularCareers = Object.entries(careerCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([name, count], index) => ({
      name,
      percentage: Math.round((count / (careerEvents?.length || 1)) * 100),
      color: ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-red-500'][index]
    }))

  return { popularCareers }
}

async function getUserEngagement(supabase: any) {
  // Get user activity over time
  const { data: dailyActivity } = await supabase
    .from('analytics')
    .select('created_at')
    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
    .order('created_at', { ascending: true })

  // Group by day
  const dailyCounts: { [key: string]: number } = {}
  dailyActivity?.forEach((activity: any) => {
    const date = new Date(activity.created_at).toISOString().split('T')[0]
    dailyCounts[date] = (dailyCounts[date] || 0) + 1
  })

  const engagementData = Object.entries(dailyCounts).map(([date, count]) => ({
    date,
    count
  }))

  return { engagementData }
}