import { supabase } from "@/integrations/supabase/client";

/**
 * Baby service to handle baby profile operations
 * Uses type assertions to avoid Supabase's complex type inference
 */

interface Baby {
  id: string;
  user_id: string;
  name: string;
  birth_date: string;
  gender: string;
}

export const babyService = {
  /**
   * Get the first baby profile for a user
   */
  async getFirstBaby(userId: string): Promise<Baby | null> {
    const { data, error } = await (supabase as any)
      .from("babies")
      .select("id, user_id, name, birth_date, gender")
      .eq("user_id", userId)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching baby:", error);
      return null;
    }

    return data as Baby | null;
  },

  /**
   * Create a new baby profile
   */
  async createBaby(baby: {
    user_id: string;
    name: string;
    birth_date: string;
    gender: string;
  }): Promise<Baby | null> {
    const { data, error } = await (supabase as any)
      .from("babies")
      .insert(baby)
      .select("id, user_id, name, birth_date, gender")
      .single();

    if (error) {
      console.error("Error creating baby:", error);
      return null;
    }

    return data as Baby | null;
  },

  /**
   * Get or create baby profile for a user
   */
  async getOrCreateBaby(userId: string): Promise<string | null> {
    // Try to get existing baby
    const existingBaby = await this.getFirstBaby(userId);
    
    if (existingBaby) {
      return existingBaby.id;
    }

    // Create default baby profile for Yusra
    const newBaby = await this.createBaby({
      user_id: userId,
      name: "Yusra",
      birth_date: "2025-09-15",
      gender: "female",
    });

    return newBaby?.id || null;
  },
};