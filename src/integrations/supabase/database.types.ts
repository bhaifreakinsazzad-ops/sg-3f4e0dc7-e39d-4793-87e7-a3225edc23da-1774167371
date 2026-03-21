 
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      babies: {
        Row: {
          birth_date: string
          birth_head_circumference: number | null
          birth_length: number | null
          birth_weight: number | null
          blood_type: string | null
          created_at: string | null
          created_by: string | null
          gender: string | null
          id: string
          name: string
          photo_url: string | null
          updated_at: string | null
        }
        Insert: {
          birth_date: string
          birth_head_circumference?: number | null
          birth_length?: number | null
          birth_weight?: number | null
          blood_type?: string | null
          created_at?: string | null
          created_by?: string | null
          gender?: string | null
          id?: string
          name: string
          photo_url?: string | null
          updated_at?: string | null
        }
        Update: {
          birth_date?: string
          birth_head_circumference?: number | null
          birth_length?: number | null
          birth_weight?: number | null
          blood_type?: string | null
          created_at?: string | null
          created_by?: string | null
          gender?: string | null
          id?: string
          name?: string
          photo_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "babies_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_conversations: {
        Row: {
          baby_id: string | null
          created_at: string | null
          id: string
          is_emergency: boolean | null
          language: string | null
          message: string
          response: string | null
          user_id: string | null
        }
        Insert: {
          baby_id?: string | null
          created_at?: string | null
          id?: string
          is_emergency?: boolean | null
          language?: string | null
          message: string
          response?: string | null
          user_id?: string | null
        }
        Update: {
          baby_id?: string | null
          created_at?: string | null
          id?: string
          is_emergency?: boolean | null
          language?: string | null
          message?: string
          response?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_conversations_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      diaper_changes: {
        Row: {
          baby_id: string | null
          brand: string | null
          change_time: string
          change_type: string
          created_at: string | null
          created_by: string | null
          has_rash: boolean | null
          id: string
          notes: string | null
          rash_severity: string | null
        }
        Insert: {
          baby_id?: string | null
          brand?: string | null
          change_time: string
          change_type: string
          created_at?: string | null
          created_by?: string | null
          has_rash?: boolean | null
          id?: string
          notes?: string | null
          rash_severity?: string | null
        }
        Update: {
          baby_id?: string | null
          brand?: string | null
          change_time?: string
          change_type?: string
          created_at?: string | null
          created_by?: string | null
          has_rash?: boolean | null
          id?: string
          notes?: string | null
          rash_severity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "diaper_changes_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diaper_changes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      family_members: {
        Row: {
          created_at: string | null
          id: string
          is_primary: boolean | null
          permissions: string
          profile_id: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          permissions: string
          profile_id?: string | null
          role: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          permissions?: string
          profile_id?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "family_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      family_messages: {
        Row: {
          baby_id: string | null
          content: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          media_url: string | null
          message_type: string | null
          sender_id: string | null
        }
        Insert: {
          baby_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          media_url?: string | null
          message_type?: string | null
          sender_id?: string | null
        }
        Update: {
          baby_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          media_url?: string | null
          message_type?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "family_messages_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "family_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feedings: {
        Row: {
          amount_ml: number | null
          baby_id: string | null
          created_at: string | null
          created_by: string | null
          duration_minutes: number | null
          feeding_time: string
          feeding_type: string
          food_description: string | null
          id: string
          notes: string | null
          side: string | null
        }
        Insert: {
          amount_ml?: number | null
          baby_id?: string | null
          created_at?: string | null
          created_by?: string | null
          duration_minutes?: number | null
          feeding_time: string
          feeding_type: string
          food_description?: string | null
          id?: string
          notes?: string | null
          side?: string | null
        }
        Update: {
          amount_ml?: number | null
          baby_id?: string | null
          created_at?: string | null
          created_by?: string | null
          duration_minutes?: number | null
          feeding_time?: string
          feeding_type?: string
          food_description?: string | null
          id?: string
          notes?: string | null
          side?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedings_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_records: {
        Row: {
          baby_id: string | null
          created_at: string | null
          created_by: string | null
          head_circumference_cm: number | null
          id: string
          length_cm: number | null
          measurement_date: string
          notes: string | null
          weight_kg: number | null
        }
        Insert: {
          baby_id?: string | null
          created_at?: string | null
          created_by?: string | null
          head_circumference_cm?: number | null
          id?: string
          length_cm?: number | null
          measurement_date: string
          notes?: string | null
          weight_kg?: number | null
        }
        Update: {
          baby_id?: string | null
          created_at?: string | null
          created_by?: string | null
          head_circumference_cm?: number | null
          id?: string
          length_cm?: number | null
          measurement_date?: string
          notes?: string | null
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "growth_records_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "growth_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      health_records: {
        Row: {
          baby_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          doctor_name: string | null
          dosage: string | null
          hospital: string | null
          id: string
          medication_name: string | null
          record_date: string
          record_type: string
          severity: string | null
          temperature_celsius: number | null
          title: string
        }
        Insert: {
          baby_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          doctor_name?: string | null
          dosage?: string | null
          hospital?: string | null
          id?: string
          medication_name?: string | null
          record_date: string
          record_type: string
          severity?: string | null
          temperature_celsius?: number | null
          title: string
        }
        Update: {
          baby_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          doctor_name?: string | null
          dosage?: string | null
          hospital?: string | null
          id?: string
          medication_name?: string | null
          record_date?: string
          record_type?: string
          severity?: string | null
          temperature_celsius?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "health_records_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "health_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      memories: {
        Row: {
          baby_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          media_url: string | null
          memory_date: string
          memory_type: string | null
          tags: string[] | null
          title: string
        }
        Insert: {
          baby_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          media_url?: string | null
          memory_date: string
          memory_type?: string | null
          tags?: string[] | null
          title: string
        }
        Update: {
          baby_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          media_url?: string | null
          memory_date?: string
          memory_type?: string | null
          tags?: string[] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "memories_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memories_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          achieved_date: string | null
          baby_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          expected_age_months: number | null
          id: string
          is_achieved: boolean | null
          milestone_type: string
          photo_url: string | null
          title: string
          video_url: string | null
        }
        Insert: {
          achieved_date?: string | null
          baby_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          expected_age_months?: number | null
          id?: string
          is_achieved?: boolean | null
          milestone_type: string
          photo_url?: string | null
          title: string
          video_url?: string | null
        }
        Update: {
          achieved_date?: string | null
          baby_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          expected_age_months?: number | null
          id?: string
          is_achieved?: boolean | null
          milestone_type?: string
          photo_url?: string | null
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "milestones_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestones_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      shopping_items: {
        Row: {
          baby_id: string | null
          category: string | null
          created_at: string | null
          created_by: string | null
          estimated_cost: number | null
          id: string
          is_purchased: boolean | null
          item_name: string
          notes: string | null
          quantity: number | null
        }
        Insert: {
          baby_id?: string | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          estimated_cost?: number | null
          id?: string
          is_purchased?: boolean | null
          item_name: string
          notes?: string | null
          quantity?: number | null
        }
        Update: {
          baby_id?: string | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          estimated_cost?: number | null
          id?: string
          is_purchased?: boolean | null
          item_name?: string
          notes?: string | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_items_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sleep_sessions: {
        Row: {
          baby_id: string | null
          created_at: string | null
          created_by: string | null
          duration_minutes: number | null
          end_time: string | null
          id: string
          location: string | null
          notes: string | null
          quality: string | null
          start_time: string
        }
        Insert: {
          baby_id?: string | null
          created_at?: string | null
          created_by?: string | null
          duration_minutes?: number | null
          end_time?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          quality?: string | null
          start_time: string
        }
        Update: {
          baby_id?: string | null
          created_at?: string | null
          created_by?: string | null
          duration_minutes?: number | null
          end_time?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          quality?: string | null
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "sleep_sessions_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sleep_sessions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vaccinations: {
        Row: {
          administered_date: string | null
          baby_id: string | null
          batch_number: string | null
          created_at: string | null
          created_by: string | null
          id: string
          is_completed: boolean | null
          location: string | null
          notes: string | null
          scheduled_date: string | null
          vaccine_name: string
        }
        Insert: {
          administered_date?: string | null
          baby_id?: string | null
          batch_number?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_completed?: boolean | null
          location?: string | null
          notes?: string | null
          scheduled_date?: string | null
          vaccine_name: string
        }
        Update: {
          administered_date?: string | null
          baby_id?: string | null
          batch_number?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_completed?: boolean | null
          location?: string | null
          notes?: string | null
          scheduled_date?: string | null
          vaccine_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "vaccinations_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vaccinations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
