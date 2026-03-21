import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

export const trackerService = {
  // Feeding
  async addFeeding(data: Tables["feedings"]["Insert"]) {
    const { data: feeding, error } = await supabase
      .from("feedings")
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return feeding;
  },

  async getRecentFeedings(babyId: string, limit = 10) {
    const { data, error } = await supabase
      .from("feedings")
      .select("*")
      .eq("baby_id", babyId)
      .order("feeding_time", { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  },

  // Sleep
  async addSleep(data: Tables["sleep_sessions"]["Insert"]) {
    const { data: sleep, error } = await supabase
      .from("sleep_sessions")
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return sleep;
  },

  async getRecentSleep(babyId: string, limit = 10) {
    const { data, error } = await supabase
      .from("sleep_sessions")
      .select("*")
      .eq("baby_id", babyId)
      .order("start_time", { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  },

  // Diapers
  async addDiaper(data: Tables["diaper_changes"]["Insert"]) {
    const { data: diaper, error } = await supabase
      .from("diaper_changes")
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return diaper;
  },

  async getRecentDiapers(babyId: string, limit = 10) {
    const { data, error } = await supabase
      .from("diaper_changes")
      .select("*")
      .eq("baby_id", babyId)
      .order("change_time", { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  },

  // Growth
  async addGrowth(data: Tables["growth_records"]["Insert"]) {
    const { data: growth, error } = await supabase
      .from("growth_records")
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return growth;
  },

  async getGrowthHistory(babyId: string) {
    const { data, error } = await supabase
      .from("growth_records")
      .select("*")
      .eq("baby_id", babyId)
      .order("measurement_date", { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // Dashboard stats
  async getDashboardStats(babyId: string) {
    const today = new Date().toISOString().split("T")[0];
    
    const [feedings, sleep, diapers] = await Promise.all([
      supabase
        .from("feedings")
        .select("*")
        .eq("baby_id", babyId)
        .gte("feeding_time", `${today}T00:00:00`)
        .order("feeding_time", { ascending: false }),
      supabase
        .from("sleep_sessions")
        .select("*")
        .eq("baby_id", babyId)
        .gte("start_time", `${today}T00:00:00`)
        .order("start_time", { ascending: false }),
      supabase
        .from("diaper_changes")
        .select("*")
        .eq("baby_id", babyId)
        .gte("change_time", `${today}T00:00:00`)
        .order("change_time", { ascending: false }),
    ]);

    return {
      feedings: feedings.data || [],
      sleep: sleep.data || [],
      diapers: diapers.data || [],
    };
  },

  // Predictions (pattern analysis)
  async predictNextFeeding(babyId: string) {
    const { data } = await supabase
      .from("feedings")
      .select("feeding_time")
      .eq("baby_id", babyId)
      .order("feeding_time", { ascending: false })
      .limit(10);

    if (!data || data.length < 3) return null;

    // Calculate average interval
    const intervals: number[] = [];
    for (let i = 0; i < data.length - 1; i++) {
      const diff = new Date(data[i].feeding_time).getTime() - new Date(data[i + 1].feeding_time).getTime();
      intervals.push(diff);
    }

    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const lastFeeding = new Date(data[0].feeding_time);
    const nextFeeding = new Date(lastFeeding.getTime() + avgInterval);

    return {
      time: nextFeeding,
      confidence: intervals.length >= 7 ? "high" : "medium",
      minutesUntil: Math.round((nextFeeding.getTime() - Date.now()) / 60000),
    };
  },
};