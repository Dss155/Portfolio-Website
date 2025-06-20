export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contact_info: {
        Row: {
          created_at: string
          display_text: string | null
          href: string | null
          id: string
          type: string
          value: string
        }
        Insert: {
          created_at?: string
          display_text?: string | null
          href?: string | null
          id?: string
          type: string
          value: string
        }
        Update: {
          created_at?: string
          display_text?: string | null
          href?: string | null
          id?: string
          type?: string
          value?: string
        }
        Relationships: []
      }
      experience: {
        Row: {
          company: string
          created_at: string
          description: string[] | null
          duration: string
          id: string
          location: string | null
          position: string
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          description?: string[] | null
          duration: string
          id?: string
          location?: string | null
          position: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string[] | null
          duration?: string
          id?: string
          location?: string | null
          position?: string
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_content: {
        Row: {
          created_at: string
          field: string
          id: string
          section: string
          updated_at: string
          value: string | null
        }
        Insert: {
          created_at?: string
          field: string
          id?: string
          section: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          created_at?: string
          field?: string
          id?: string
          section?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          featured: boolean | null
          github_url: string | null
          id: string
          image_url: string | null
          live_url: string | null
          technologies: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          live_url?: string | null
          technologies?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          live_url?: string | null
          technologies?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string
          id: string
          level: number
          name: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          level: number
          name: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          level?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
