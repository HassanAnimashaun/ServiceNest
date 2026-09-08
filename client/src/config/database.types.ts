export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_status: Database['public']['Enums']['booking_status_enum']
          cancelled_at: string | null
          client_id: string
          created_at: string
          id: string
          notes: string | null
          package_id: string
          package_name_snapshot: string
          provider_id: string
          scheduled_end: string
          scheduled_start: string
          service_address: string
          service_city: string
          service_lat: number
          service_lng: number
          service_state: string
          service_zip: string
          total_price: number
          updated_at: string
          vehicle_id: string
        }
        Insert: {
          booking_status?: Database['public']['Enums']['booking_status_enum']
          cancelled_at?: string | null
          client_id: string
          created_at?: string
          id?: string
          notes?: string | null
          package_id: string
          package_name_snapshot: string
          provider_id: string
          scheduled_end: string
          scheduled_start: string
          service_address: string
          service_city: string
          service_lat: number
          service_lng: number
          service_state: string
          service_zip: string
          total_price: number
          updated_at?: string
          vehicle_id: string
        }
        Update: {
          booking_status?: Database['public']['Enums']['booking_status_enum']
          cancelled_at?: string | null
          client_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          package_id?: string
          package_name_snapshot?: string
          provider_id?: string
          scheduled_end?: string
          scheduled_start?: string
          service_address?: string
          service_city?: string
          service_lat?: number
          service_lng?: number
          service_state?: string
          service_zip?: string
          total_price?: number
          updated_at?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'bookings_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'bookings_package_id_fkey'
            columns: ['package_id']
            isOneToOne: false
            referencedRelation: 'packages'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'bookings_provider_id_fkey'
            columns: ['provider_id']
            isOneToOne: false
            referencedRelation: 'providers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'bookings_vehicle_id_fkey'
            columns: ['vehicle_id']
            isOneToOne: false
            referencedRelation: 'vehicles'
            referencedColumns: ['id']
          },
        ]
      }
      clients: {
        Row: {
          auth_user_id: string
          created_at: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          auth_user_id: string
          created_at?: string
          full_name: string
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          auth_user_id?: string
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          booking_id: string
          created_at: string
          error_message: string | null
          id: string
          notification_type: Database['public']['Enums']['notification_type_enum']
          recipient_email: string
          recipient_type: Database['public']['Enums']['recipient_type_enum']
          sent_at: string | null
          updated_at: string
        }
        Insert: {
          booking_id: string
          created_at?: string
          error_message?: string | null
          id?: string
          notification_type: Database['public']['Enums']['notification_type_enum']
          recipient_email: string
          recipient_type: Database['public']['Enums']['recipient_type_enum']
          sent_at?: string | null
          updated_at?: string
        }
        Update: {
          booking_id?: string
          created_at?: string
          error_message?: string | null
          id?: string
          notification_type?: Database['public']['Enums']['notification_type_enum']
          recipient_email?: string
          recipient_type?: Database['public']['Enums']['recipient_type_enum']
          sent_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'notifications_booking_id_fkey'
            columns: ['booking_id']
            isOneToOne: false
            referencedRelation: 'bookings'
            referencedColumns: ['id']
          },
        ]
      }
      package_prices: {
        Row: {
          created_at: string
          duration_minutes: number
          id: string
          package_id: string
          price: number
          updated_at: string
          vehicle_size: Database['public']['Enums']['vehicle_size_enum']
        }
        Insert: {
          created_at?: string
          duration_minutes: number
          id?: string
          package_id: string
          price: number
          updated_at?: string
          vehicle_size: Database['public']['Enums']['vehicle_size_enum']
        }
        Update: {
          created_at?: string
          duration_minutes?: number
          id?: string
          package_id?: string
          price?: number
          updated_at?: string
          vehicle_size?: Database['public']['Enums']['vehicle_size_enum']
        }
        Relationships: [
          {
            foreignKeyName: 'package_prices_package_id_fkey'
            columns: ['package_id']
            isOneToOne: false
            referencedRelation: 'packages'
            referencedColumns: ['id']
          },
        ]
      }
      packages: {
        Row: {
          created_at: string
          description: string | null
          id: string
          package_name: string
          provider_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          package_name: string
          provider_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          package_name?: string
          provider_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'packages_provider_id_fkey'
            columns: ['provider_id']
            isOneToOne: false
            referencedRelation: 'providers'
            referencedColumns: ['id']
          },
        ]
      }
      providers: {
        Row: {
          address: string | null
          business_name: string
          business_type: Database['public']['Enums']['business_type_enum']
          city: string | null
          created_at: string
          full_name: string
          home_base_lat: number | null
          home_base_lng: number | null
          id: string
          isonboarding: boolean
          phone: string | null
          service_radius_miles: number | null
          state: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_current_period_end: string | null
          subscription_started_at: string | null
          subscription_status: Database['public']['Enums']['subscription_status_enum'] | null
          trial_ends_at: string | null
          updated_at: string
          zip: string | null
        }
        Insert: {
          address?: string | null
          business_name: string
          business_type?: Database['public']['Enums']['business_type_enum']
          city?: string | null
          created_at?: string
          full_name: string
          home_base_lat?: number | null
          home_base_lng?: number | null
          id?: string
          isonboarding?: boolean
          phone?: string | null
          service_radius_miles?: number | null
          state?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_current_period_end?: string | null
          subscription_started_at?: string | null
          subscription_status?: Database['public']['Enums']['subscription_status_enum'] | null
          trial_ends_at?: string | null
          updated_at?: string
          zip?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string
          business_type?: Database['public']['Enums']['business_type_enum']
          city?: string | null
          created_at?: string
          full_name?: string
          home_base_lat?: number | null
          home_base_lng?: number | null
          id?: string
          isonboarding?: boolean
          phone?: string | null
          service_radius_miles?: number | null
          state?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_current_period_end?: string | null
          subscription_started_at?: string | null
          subscription_status?: Database['public']['Enums']['subscription_status_enum'] | null
          trial_ends_at?: string | null
          updated_at?: string
          zip?: string | null
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          client_id: string
          color: string | null
          created_at: string
          deleted_at: string | null
          id: string
          make: string
          model: string
          updated_at: string
          vehicle_size: Database['public']['Enums']['vehicle_size_enum']
          year: number
        }
        Insert: {
          client_id: string
          color?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          make: string
          model: string
          updated_at?: string
          vehicle_size: Database['public']['Enums']['vehicle_size_enum']
          year: number
        }
        Update: {
          client_id?: string
          color?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          make?: string
          model?: string
          updated_at?: string
          vehicle_size?: Database['public']['Enums']['vehicle_size_enum']
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: 'vehicles_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
        ]
      }
      working_hours: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string | null
          id: string
          is_open: boolean
          provider_id: string
          start_time: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time?: string | null
          id?: string
          is_open?: boolean
          provider_id: string
          start_time?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string | null
          id?: string
          is_open?: boolean
          provider_id?: string
          start_time?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'working_hours_provider_id_fkey'
            columns: ['provider_id']
            isOneToOne: false
            referencedRelation: 'providers'
            referencedColumns: ['id']
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
      booking_status_enum: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
      business_type_enum: 'detailing' | 'mechanic' | 'landscaping'
      notification_type_enum: 'booking_confirmation' | 'booking_reminder' | 'booking_cancellation'
      recipient_type_enum: 'client' | 'provider'
      subscription_status_enum: 'trial' | 'active' | 'past_due' | 'cancelled'
      vehicle_size_enum: 'sedan' | 'suv' | 'truck' | 'van' | 'oversized'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status_enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
      business_type_enum: ['detailing', 'mechanic', 'landscaping'],
      notification_type_enum: ['booking_confirmation', 'booking_reminder', 'booking_cancellation'],
      recipient_type_enum: ['client', 'provider'],
      subscription_status_enum: ['trial', 'active', 'past_due', 'cancelled'],
      vehicle_size_enum: ['sedan', 'suv', 'truck', 'van', 'oversized'],
    },
  },
} as const
