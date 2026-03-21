import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Baby, Clock, Droplet, Moon, TrendingUp, Calendar, Bell, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Image from "next/image";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [babyProfile, setBabyProfile] = useState<any>(null);
  const [todayStats, setTodayStats] = useState({
    feedings: 0,
    diapers: 0,
    sleepHours: 0,
    lastFeedingTime: null as string | null,
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    const { data: babies } = await supabase
      .from("babies")
      .select("*")
      .limit(1)
      .single();

    if (babies) {
      setBabyProfile(babies);
      loadTodayStats(babies.id);
    }
  };

  const loadTodayStats = async (babyId: string) => {
    const today = new Date().toISOString().split("T")[0];

    const { data: feedings } = await supabase
      .from("feedings")
      .select("*")
      .eq("baby_id", babyId)
      .gte("feeding_time", `${today}T00:00:00`)
      .order("feeding_time", { ascending: false });

    const { data: diapers } = await supabase
      .from("diaper_changes")
      .select("*")
      .eq("baby_id", babyId)
      .gte("change_time", `${today}T00:00:00`);

    const { data: sleep } = await supabase
      .from("sleep_sessions")
      .select("*")
      .eq("baby_id", babyId)
      .gte("start_time", `${today}T00:00:00`);

    const sleepHours = sleep?.reduce((acc, s) => {
      if (s.end_time) {
        const duration = (new Date(s.end_time).getTime() - new Date(s.start_time).getTime()) / (1000 * 60 * 60);
        return acc + duration;
      }
      return acc;
    }, 0) || 0;

    setTodayStats({
      feedings: feedings?.length || 0,
      diapers: diapers?.length || 0,
      sleepHours: Math.round(sleepHours * 10) / 10,
      lastFeedingTime: feedings?.[0]?.feeding_time || null,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-terracotta-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) return null;

  const getTimeSinceLastFeeding = () => {
    if (!todayStats.lastFeedingTime) return "No feedings today";
    const lastFeeding = new Date(todayStats.lastFeedingTime);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - lastFeeding.getTime()) / (1000 * 60));
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes}m ago`;
  };

  return (
    <>
      <SEO title="Dashboard - Yusra's Manager" description="Track Yusra's daily activities and growth" />
      <Layout>
        <div className="max-w-7xl mx-auto">
          <div className="relative h-48 lg:h-64 rounded-2xl overflow-hidden mb-6 card-elevated">
            <Image
              src="/yusra-smiling.jpg"
              alt="Yusra"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl lg:text-4xl font-bold font-baloo mb-2">
                Welcome to Yusra's World
              </h1>
              <p className="text-lg opacity-90">যুসরার জগতে স্বাগতম</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 bg-gradient-to-br from-terracotta-50 to-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-terracotta-100 flex items-center justify-center">
                  <Baby className="w-5 h-5 text-terracotta-600" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-terracotta-600">{todayStats.feedings}</div>
                  <div className="text-xs text-neutral-600">Feedings</div>
                </div>
              </div>
              <div className="text-xs text-neutral-500 mt-2">{getTimeSinceLastFeeding()}</div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-sage-50 to-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-sage-600" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-sage-600">{todayStats.sleepHours}h</div>
                  <div className="text-xs text-neutral-600">Sleep</div>
                </div>
              </div>
              <div className="text-xs text-neutral-500 mt-2">Today's total</div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-peach-50 to-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-peach-100 flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-peach-600" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-peach-600">{todayStats.diapers}</div>
                  <div className="text-xs text-neutral-600">Diapers</div>
                </div>
              </div>
              <div className="text-xs text-neutral-500 mt-2">Changed today</div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-cream-100 to-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-terracotta-600" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-terracotta-600">100%</div>
                  <div className="text-xs text-neutral-600">Love</div>
                </div>
              </div>
              <div className="text-xs text-neutral-500 mt-2">Always full</div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Quick Actions</h2>
                <Clock className="w-5 h-5 text-neutral-400" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={() => router.push("/tracker?tab=feeding")} className="h-auto py-4 flex-col gap-2">
                  <Baby className="w-6 h-6" />
                  <span className="text-sm">Log Feeding</span>
                </Button>
                <Button onClick={() => router.push("/tracker?tab=sleep")} variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Moon className="w-6 h-6" />
                  <span className="text-sm">Log Sleep</span>
                </Button>
                <Button onClick={() => router.push("/tracker?tab=diaper")} variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Droplet className="w-6 h-6" />
                  <span className="text-sm">Log Diaper</span>
                </Button>
                <Button onClick={() => router.push("/tracker?tab=growth")} variant="outline" className="h-auto py-4 flex-col gap-2">
                  <TrendingUp className="w-6 h-6" />
                  <span className="text-sm">Log Growth</span>
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Upcoming</h2>
                <Calendar className="w-5 h-5 text-neutral-400" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-terracotta-50">
                  <div className="w-2 h-2 rounded-full bg-terracotta-600"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Next Feeding</div>
                    <div className="text-xs text-neutral-600">Predicted in 45 minutes</div>
                  </div>
                  <Bell className="w-4 h-4 text-terracotta-600" />
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-sage-50">
                  <div className="w-2 h-2 rounded-full bg-sage-600"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Sleep Time</div>
                    <div className="text-xs text-neutral-600">In 2 hours 15 minutes</div>
                  </div>
                  <Bell className="w-4 h-4 text-sage-600" />
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Today's Timeline</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-cream-200"></div>
              <div className="space-y-4 pl-12">
                {todayStats.feedings > 0 && (
                  <div className="relative">
                    <div className="absolute -left-12 w-8 h-8 rounded-full bg-terracotta-100 flex items-center justify-center">
                      <Baby className="w-4 h-4 text-terracotta-600" />
                    </div>
                    <div className="text-sm font-medium">Fed {todayStats.feedings} times</div>
                    <div className="text-xs text-neutral-500">Last feeding: {getTimeSinceLastFeeding()}</div>
                  </div>
                )}
                {todayStats.diapers > 0 && (
                  <div className="relative">
                    <div className="absolute -left-12 w-8 h-8 rounded-full bg-peach-100 flex items-center justify-center">
                      <Droplet className="w-4 h-4 text-peach-600" />
                    </div>
                    <div className="text-sm font-medium">{todayStats.diapers} diaper changes</div>
                    <div className="text-xs text-neutral-500">Keeping Yusra comfortable</div>
                  </div>
                )}
                {todayStats.sleepHours > 0 && (
                  <div className="relative">
                    <div className="absolute -left-12 w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center">
                      <Moon className="w-4 h-4 text-sage-600" />
                    </div>
                    <div className="text-sm font-medium">{todayStats.sleepHours} hours of sleep</div>
                    <div className="text-xs text-neutral-500">Sweet dreams</div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </>
  );
}