import { supabase } from "@/integrations/supabase/client";

export const predictionService = {
  async analyzeFeedingPattern(babyId: string) {
    const { data } = await supabase
      .from("feedings")
      .select("feeding_time, duration_minutes, type")
      .eq("baby_id", babyId)
      .order("feeding_time", { ascending: false })
      .limit(20);

    if (!data || data.length < 5) {
      return {
        nextFeedingTime: null,
        confidence: "low",
        averageInterval: null,
        pattern: "insufficient_data",
      };
    }

    // Calculate intervals between feedings
    const intervals: number[] = [];
    for (let i = 0; i < data.length - 1; i++) {
      const diff = new Date(data[i].feeding_time).getTime() - new Date(data[i + 1].feeding_time).getTime();
      intervals.push(diff / (1000 * 60)); // Convert to minutes
    }

    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const stdDev = Math.sqrt(
      intervals.reduce((sum, val) => sum + Math.pow(val - avgInterval, 2), 0) / intervals.length
    );

    const lastFeeding = new Date(data[0].feeding_time);
    const nextFeedingTime = new Date(lastFeeding.getTime() + avgInterval * 60 * 1000);
    const minutesUntil = Math.round((nextFeedingTime.getTime() - Date.now()) / (1000 * 60));

    // Determine confidence based on pattern consistency
    let confidence: "high" | "medium" | "low" = "low";
    if (stdDev < avgInterval * 0.2 && data.length >= 10) confidence = "high";
    else if (stdDev < avgInterval * 0.4 && data.length >= 7) confidence = "medium";

    return {
      nextFeedingTime,
      minutesUntil,
      confidence,
      averageInterval: Math.round(avgInterval),
      pattern: stdDev < avgInterval * 0.3 ? "regular" : "irregular",
    };
  },

  async analyzeSleepPattern(babyId: string) {
    const { data } = await supabase
      .from("sleep_sessions")
      .select("start_time, end_time, quality")
      .eq("baby_id", babyId)
      .order("start_time", { ascending: false })
      .limit(15);

    if (!data || data.length < 3) {
      return {
        nextSleepTime: null,
        confidence: "low",
        averageDuration: null,
        pattern: "insufficient_data",
      };
    }

    // Calculate sleep intervals and durations
    const intervals: number[] = [];
    const durations: number[] = [];

    data.forEach((session) => {
      if (session.end_time) {
        const duration = (new Date(session.end_time).getTime() - new Date(session.start_time).getTime()) / (1000 * 60);
        durations.push(duration);
      }
    });

    for (let i = 0; i < data.length - 1; i++) {
      if (data[i + 1].end_time) {
        const interval = (new Date(data[i].start_time).getTime() - new Date(data[i + 1].end_time!).getTime()) / (1000 * 60);
        intervals.push(interval);
      }
    }

    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;

    const lastSleep = data[0].end_time ? new Date(data[0].end_time) : new Date(data[0].start_time);
    const nextSleepTime = new Date(lastSleep.getTime() + avgInterval * 60 * 1000);
    const minutesUntil = Math.round((nextSleepTime.getTime() - Date.now()) / (1000 * 60));

    return {
      nextSleepTime,
      minutesUntil,
      confidence: data.length >= 10 ? "high" : "medium",
      averageDuration: Math.round(avgDuration),
      averageInterval: Math.round(avgInterval),
      pattern: "tracked",
    };
  },

  async getDailyPredictions(babyId: string) {
    const [feeding, sleep] = await Promise.all([
      this.analyzeFeedingPattern(babyId),
      this.analyzeSleepPattern(babyId),
    ]);

    return { feeding, sleep };
  },
};