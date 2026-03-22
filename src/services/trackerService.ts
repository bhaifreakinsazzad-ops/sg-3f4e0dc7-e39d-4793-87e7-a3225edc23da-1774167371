import { supabase } from "@/integrations/supabase/client";

/**
 * Tracker service to fetch and aggregate tracking data
 * Uses type assertions to avoid Supabase's complex type inference
 */

export const trackerService = {
  /**
   * Add a new feeding record
   */
  async addFeeding(data: {
    baby_id: string;
    feeding_time: string;
    feeding_type: string;
    breast_side?: string;
    duration_minutes?: number;
    amount_ml?: number;
    notes?: string;
  }) {
    const { data: result, error } = await (supabase as any)
      .from("feedings")
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error("Error adding feeding:", error);
      throw error;
    }

    return result;
  },

  /**
   * Add a new sleep session
   */
  async addSleep(data: {
    baby_id: string;
    start_time: string;
    end_time?: string;
    sleep_quality: string;
    location: string;
    notes?: string;
  }) {
    const { data: result, error } = await (supabase as any)
      .from("sleep_sessions")
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error("Error adding sleep:", error);
      throw error;
    }

    return result;
  },

  /**
   * Add a new diaper change
   */
  async addDiaper(data: {
    baby_id: string;
    change_time: string;
    change_type: string;
    has_rash?: boolean;
    notes?: string;
  }) {
    const { data: result, error } = await (supabase as any)
      .from("diaper_changes")
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error("Error adding diaper change:", error);
      throw error;
    }

    return result;
  },

  /**
   * Get feeding trends for the last 7 days
   */
  async getFeedingTrends(babyId: string) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data, error } = await (supabase as any)
      .from("feedings")
      .select("feeding_time, amount_ml")
      .eq("baby_id", babyId)
      .gte("feeding_time", sevenDaysAgo.toISOString())
      .order("feeding_time", { ascending: true });

    if (error) {
      console.error("Error fetching feeding trends:", error);
      return [];
    }

    // Aggregate by date
    const grouped = (data || []).reduce((acc: any, feeding: any) => {
      const date = new Date(feeding.feeding_time).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      if (!acc[date]) {
        acc[date] = { date, count: 0, totalAmount: 0 };
      }
      acc[date].count += 1;
      acc[date].totalAmount += feeding.amount_ml || 0;
      return acc;
    }, {});

    return Object.values(grouped);
  },

  /**
   * Get sleep trends for the last 7 days
   */
  async getSleepTrends(babyId: string) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data, error } = await (supabase as any)
      .from("sleep_sessions")
      .select("start_time, end_time, sleep_quality")
      .eq("baby_id", babyId)
      .gte("start_time", sevenDaysAgo.toISOString())
      .order("start_time", { ascending: true });

    if (error) {
      console.error("Error fetching sleep trends:", error);
      return [];
    }

    // Calculate hours and aggregate by date
    const grouped = (data || []).reduce((acc: any, session: any) => {
      const date = new Date(session.start_time).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      
      let hours = 0;
      if (session.end_time) {
        const start = new Date(session.start_time);
        const end = new Date(session.end_time);
        hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      }

      if (!acc[date]) {
        acc[date] = { date, hours: 0, quality: session.sleep_quality };
      }
      acc[date].hours += hours;
      return acc;
    }, {});

    return Object.values(grouped);
  },

  /**
   * Get diaper change distribution
   */
  async getDiaperTrends(babyId: string) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data, error } = await (supabase as any)
      .from("diaper_changes")
      .select("change_type")
      .eq("baby_id", babyId)
      .gte("change_time", sevenDaysAgo.toISOString());

    if (error) {
      console.error("Error fetching diaper trends:", error);
      return [];
    }

    // Count by type
    const grouped = (data || []).reduce((acc: any, change: any) => {
      const type = change.change_type;
      if (!acc[type]) {
        acc[type] = { type, count: 0 };
      }
      acc[type].count += 1;
      return acc;
    }, {});

    return Object.values(grouped);
  },

  /**
   * Get growth progression for the last 6 months
   */
  async getGrowthTrends(babyId: string) {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const { data, error } = await (supabase as any)
      .from("growth_records")
      .select("measurement_date, weight_kg, height_cm, head_circumference_cm")
      .eq("baby_id", babyId)
      .gte("measurement_date", sixMonthsAgo.toISOString().split("T")[0])
      .order("measurement_date", { ascending: true });

    if (error) {
      console.error("Error fetching growth trends:", error);
      return [];
    }

    return (data || []).map((record: any) => ({
      date: new Date(record.measurement_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      weight: record.weight_kg || 0,
      height: record.height_cm || 0,
      headCircumference: record.head_circumference_cm || 0,
    }));
  },

  /**
   * Get all trends data in one call
   */
  async getAllTrends(babyId: string) {
    const [feedingData, sleepData, diaperData, growthData] = await Promise.all([
      this.getFeedingTrends(babyId),
      this.getSleepTrends(babyId),
      this.getDiaperTrends(babyId),
      this.getGrowthTrends(babyId),
    ]);

    return {
      feedingData,
      sleepData,
      diaperData,
      growthData,
    };
  },
};