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
      cars: {
        Row: {
          body_type: string | null
          brand: string
          city: string | null
          created_at: string | null
          description: string | null
          doors: number | null
          exterior_color: string | null
          id: string
          interior_color: string | null
          mileage: number
          model: string
          postal_code: string | null
          price: number
          seats: number | null
          seller_id: string | null
          seller_type: string | null
          status: string | null
          title: string
          updated_at: string | null
          year: number
        }
        Insert: {
          body_type?: string | null
          brand: string
          city?: string | null
          created_at?: string | null
          description?: string | null
          doors?: number | null
          exterior_color?: string | null
          id?: string
          interior_color?: string | null
          mileage: number
          model: string
          postal_code?: string | null
          price: number
          seats?: number | null
          seller_id?: string | null
          seller_type?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          year: number
        }
        Update: {
          body_type?: string | null
          brand?: string
          city?: string | null
          created_at?: string | null
          description?: string | null
          doors?: number | null
          exterior_color?: string | null
          id?: string
          interior_color?: string | null
          mileage?: number
          model?: string
          postal_code?: string | null
          price?: number
          seats?: number | null
          seller_id?: string | null
          seller_type?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "cars_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_history: {
        Row: {
          car_id: string | null
          created_at: string | null
          date: string
          id: string
          kilometers: number
          location: string | null
          type: string
        }
        Insert: {
          car_id?: string | null
          created_at?: string | null
          date: string
          id?: string
          kilometers: number
          location?: string | null
          type: string
        }
        Update: {
          car_id?: string | null
          created_at?: string | null
          date?: string
          id?: string
          kilometers?: number
          location?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_history_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "car_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_history_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      mechanical_inspection: {
        Row: {
          brakes_abs_functional: boolean | null
          brakes_esp_functional: boolean | null
          brakes_front_calipers_condition: string | null
          brakes_front_discs_condition: string | null
          brakes_front_pads_condition: string | null
          brakes_parking_condition: string | null
          brakes_rear_calipers_condition: string | null
          brakes_rear_discs_condition: string | null
          brakes_rear_pads_condition: string | null
          car_id: string
          chassis_front_suspension: string | null
          chassis_geometry: string | null
          chassis_rear_suspension: string | null
          chassis_springs_condition: string | null
          chassis_steering_condition: string | null
          chassis_steering_type: string | null
          chassis_transmission_condition: string | null
          distribution_condition: string | null
          distribution_last_service_km: number | null
          distribution_next_service_km: number | null
          distribution_type: string | null
          drive_test_acceleration: string | null
          drive_test_braking: string | null
          drive_test_comfort: string | null
          drive_test_driving_aids: string | null
          drive_test_handling: string | null
          drive_test_notes: string | null
          drive_test_sound_insulation: string | null
          engine_belt_condition: string | null
          engine_coolant_level: string | null
          engine_displacement: string | null
          engine_error_codes: string | null
          engine_oil_level: string | null
          engine_power: string | null
          engine_torque: string | null
          engine_type: string | null
          tires_front_left_brand: string | null
          tires_front_left_depth: number | null
          tires_front_left_dimensions: string | null
          tires_front_left_type: string | null
          tires_front_right_brand: string | null
          tires_front_right_depth: number | null
          tires_front_right_dimensions: string | null
          tires_front_right_type: string | null
          tires_rear_left_brand: string | null
          tires_rear_left_depth: number | null
          tires_rear_left_dimensions: string | null
          tires_rear_left_type: string | null
          tires_rear_right_brand: string | null
          tires_rear_right_depth: number | null
          tires_rear_right_dimensions: string | null
          tires_rear_right_type: string | null
          updated_at: string | null
        }
        Insert: {
          brakes_abs_functional?: boolean | null
          brakes_esp_functional?: boolean | null
          brakes_front_calipers_condition?: string | null
          brakes_front_discs_condition?: string | null
          brakes_front_pads_condition?: string | null
          brakes_parking_condition?: string | null
          brakes_rear_calipers_condition?: string | null
          brakes_rear_discs_condition?: string | null
          brakes_rear_pads_condition?: string | null
          car_id: string
          chassis_front_suspension?: string | null
          chassis_geometry?: string | null
          chassis_rear_suspension?: string | null
          chassis_springs_condition?: string | null
          chassis_steering_condition?: string | null
          chassis_steering_type?: string | null
          chassis_transmission_condition?: string | null
          distribution_condition?: string | null
          distribution_last_service_km?: number | null
          distribution_next_service_km?: number | null
          distribution_type?: string | null
          drive_test_acceleration?: string | null
          drive_test_braking?: string | null
          drive_test_comfort?: string | null
          drive_test_driving_aids?: string | null
          drive_test_handling?: string | null
          drive_test_notes?: string | null
          drive_test_sound_insulation?: string | null
          engine_belt_condition?: string | null
          engine_coolant_level?: string | null
          engine_displacement?: string | null
          engine_error_codes?: string | null
          engine_oil_level?: string | null
          engine_power?: string | null
          engine_torque?: string | null
          engine_type?: string | null
          tires_front_left_brand?: string | null
          tires_front_left_depth?: number | null
          tires_front_left_dimensions?: string | null
          tires_front_left_type?: string | null
          tires_front_right_brand?: string | null
          tires_front_right_depth?: number | null
          tires_front_right_dimensions?: string | null
          tires_front_right_type?: string | null
          tires_rear_left_brand?: string | null
          tires_rear_left_depth?: number | null
          tires_rear_left_dimensions?: string | null
          tires_rear_left_type?: string | null
          tires_rear_right_brand?: string | null
          tires_rear_right_depth?: number | null
          tires_rear_right_dimensions?: string | null
          tires_rear_right_type?: string | null
          updated_at?: string | null
        }
        Update: {
          brakes_abs_functional?: boolean | null
          brakes_esp_functional?: boolean | null
          brakes_front_calipers_condition?: string | null
          brakes_front_discs_condition?: string | null
          brakes_front_pads_condition?: string | null
          brakes_parking_condition?: string | null
          brakes_rear_calipers_condition?: string | null
          brakes_rear_discs_condition?: string | null
          brakes_rear_pads_condition?: string | null
          car_id?: string
          chassis_front_suspension?: string | null
          chassis_geometry?: string | null
          chassis_rear_suspension?: string | null
          chassis_springs_condition?: string | null
          chassis_steering_condition?: string | null
          chassis_steering_type?: string | null
          chassis_transmission_condition?: string | null
          distribution_condition?: string | null
          distribution_last_service_km?: number | null
          distribution_next_service_km?: number | null
          distribution_type?: string | null
          drive_test_acceleration?: string | null
          drive_test_braking?: string | null
          drive_test_comfort?: string | null
          drive_test_driving_aids?: string | null
          drive_test_handling?: string | null
          drive_test_notes?: string | null
          drive_test_sound_insulation?: string | null
          engine_belt_condition?: string | null
          engine_coolant_level?: string | null
          engine_displacement?: string | null
          engine_error_codes?: string | null
          engine_oil_level?: string | null
          engine_power?: string | null
          engine_torque?: string | null
          engine_type?: string | null
          tires_front_left_brand?: string | null
          tires_front_left_depth?: number | null
          tires_front_left_dimensions?: string | null
          tires_front_left_type?: string | null
          tires_front_right_brand?: string | null
          tires_front_right_depth?: number | null
          tires_front_right_dimensions?: string | null
          tires_front_right_type?: string | null
          tires_rear_left_brand?: string | null
          tires_rear_left_depth?: number | null
          tires_rear_left_dimensions?: string | null
          tires_rear_left_type?: string | null
          tires_rear_right_brand?: string | null
          tires_rear_right_depth?: number | null
          tires_rear_right_dimensions?: string | null
          tires_rear_right_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mechanical_inspection_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: true
            referencedRelation: "car_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mechanical_inspection_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: true
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      photos: {
        Row: {
          car_id: string | null
          created_at: string | null
          id: string
          order: number
          url: string
        }
        Insert: {
          car_id?: string | null
          created_at?: string | null
          id?: string
          order: number
          url: string
        }
        Update: {
          car_id?: string | null
          created_at?: string | null
          id?: string
          order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "photos_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "car_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photos_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      technical_details: {
        Row: {
          car_id: string
          co2_emissions: number | null
          din_power: number | null
          displacement: number | null
          drive_type: string | null
          euro_standard: string | null
          fiscal_power: number | null
          fuel_consumption: number | null
          fuel_type: string | null
          gears: number | null
          transmission: string | null
        }
        Insert: {
          car_id: string
          co2_emissions?: number | null
          din_power?: number | null
          displacement?: number | null
          drive_type?: string | null
          euro_standard?: string | null
          fiscal_power?: number | null
          fuel_consumption?: number | null
          fuel_type?: string | null
          gears?: number | null
          transmission?: string | null
        }
        Update: {
          car_id?: string
          co2_emissions?: number | null
          din_power?: number | null
          displacement?: number | null
          drive_type?: string | null
          euro_standard?: string | null
          fiscal_power?: number | null
          fuel_consumption?: number | null
          fuel_type?: string | null
          gears?: number | null
          transmission?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "technical_details_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: true
            referencedRelation: "car_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "technical_details_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: true
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          buyer_id: string | null
          car_id: string | null
          created_at: string | null
          id: string
          seller_id: string | null
          status: string | null
          stripe_payment_id: string | null
        }
        Insert: {
          amount: number
          buyer_id?: string | null
          car_id?: string | null
          created_at?: string | null
          id?: string
          seller_id?: string | null
          status?: string | null
          stripe_payment_id?: string | null
        }
        Update: {
          amount?: number
          buyer_id?: string | null
          car_id?: string | null
          created_at?: string | null
          id?: string
          seller_id?: string | null
          status?: string | null
          stripe_payment_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "car_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string | null
          role: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          role?: string | null
        }
        Relationships: []
      }
      videos: {
        Row: {
          car_id: string | null
          created_at: string | null
          id: string
          url: string
        }
        Insert: {
          car_id?: string | null
          created_at?: string | null
          id?: string
          url: string
        }
        Update: {
          car_id?: string | null
          created_at?: string | null
          id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "videos_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "car_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "videos_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      car_details: {
        Row: {
          body_type: string | null
          brakes_abs_functional: boolean | null
          brakes_esp_functional: boolean | null
          brakes_front_calipers_condition: string | null
          brakes_front_discs_condition: string | null
          brakes_front_pads_condition: string | null
          brakes_parking_condition: string | null
          brakes_rear_calipers_condition: string | null
          brakes_rear_discs_condition: string | null
          brakes_rear_pads_condition: string | null
          brand: string | null
          car_updated_at: string | null
          chassis_front_suspension: string | null
          chassis_geometry: string | null
          chassis_rear_suspension: string | null
          chassis_springs_condition: string | null
          chassis_steering_condition: string | null
          chassis_steering_type: string | null
          chassis_transmission_condition: string | null
          city: string | null
          co2_emissions: number | null
          created_at: string | null
          description: string | null
          din_power: number | null
          displacement: number | null
          distribution_condition: string | null
          distribution_last_service_km: number | null
          distribution_next_service_km: number | null
          distribution_type: string | null
          doors: number | null
          drive_test_acceleration: string | null
          drive_test_braking: string | null
          drive_test_comfort: string | null
          drive_test_driving_aids: string | null
          drive_test_handling: string | null
          drive_test_notes: string | null
          drive_test_sound_insulation: string | null
          drive_type: string | null
          engine_belt_condition: string | null
          engine_coolant_level: string | null
          engine_displacement: string | null
          engine_error_codes: string | null
          engine_oil_level: string | null
          engine_power: string | null
          engine_torque: string | null
          engine_type: string | null
          euro_standard: string | null
          exterior_color: string | null
          fiscal_power: number | null
          fuel_consumption: number | null
          fuel_type: string | null
          gears: number | null
          id: string | null
          inspection_updated_at: string | null
          interior_color: string | null
          maintenance_history: Json | null
          mileage: number | null
          model: string | null
          photos: Json | null
          postal_code: string | null
          price: number | null
          seats: number | null
          seller_id: string | null
          seller_type: string | null
          status: string | null
          tires_front_left_brand: string | null
          tires_front_left_depth: number | null
          tires_front_left_dimensions: string | null
          tires_front_left_type: string | null
          tires_front_right_brand: string | null
          tires_front_right_depth: number | null
          tires_front_right_dimensions: string | null
          tires_front_right_type: string | null
          tires_rear_left_brand: string | null
          tires_rear_left_depth: number | null
          tires_rear_left_dimensions: string | null
          tires_rear_left_type: string | null
          tires_rear_right_brand: string | null
          tires_rear_right_depth: number | null
          tires_rear_right_dimensions: string | null
          tires_rear_right_type: string | null
          title: string | null
          transmission: string | null
          videos: Json | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cars_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      add_car: {
        Args: {
          car_data: Json
          technical_data: Json
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
