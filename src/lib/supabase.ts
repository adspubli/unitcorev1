import { createClient } from '@supabase/supabase-js';
// Debug log (se puede quitar luego)
// Mostramos si las variables están presentes para diagnosticar el error supabaseUrl is required
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('[Supabase Debug] Variables de entorno faltantes:', {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY_PRESENT: !!import.meta.env.VITE_SUPABASE_ANON_KEY
  });
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || '';

if (!supabaseUrl) {
  console.error('[Supabase Debug] supabaseUrl vacío después de leer .env');
}
if (!supabaseAnonKey) {
  console.error('[Supabase Debug] supabaseAnonKey vacío después de leer .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      services: {
        Row: {
          id: string;
          name: string;
          category: string;
          logo_url: string;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          logo_url: string;
          color: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          logo_url?: string;
          color?: string;
          created_at?: string;
        };
      };
      subscription_groups: {
        Row: {
          id: string;
          service_id: string;
          owner_id: string;
          title: string;
          description: string;
          total_slots: number;
          price_per_slot: number;
          start_date: string;
          end_date: string;
          status: 'active' | 'full' | 'inactive';
          instant_acceptance: boolean;
          verified_receipt: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          service_id: string;
          owner_id: string;
          title: string;
          description: string;
          total_slots: number;
          price_per_slot: number;
          start_date: string;
          end_date: string;
          status?: 'active' | 'full' | 'inactive';
          instant_acceptance?: boolean;
          verified_receipt?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          service_id?: string;
          owner_id?: string;
          title?: string;
          description?: string;
          total_slots?: number;
          price_per_slot?: number;
          start_date?: string;
          end_date?: string;
          status?: 'active' | 'full' | 'inactive';
          instant_acceptance?: boolean;
          verified_receipt?: boolean;
          created_at?: string;
        };
      };
      group_memberships: {
        Row: {
          id: string;
          user_id: string;
          group_id: string;
          status: string;
          joined_at: string;
          payment_status: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          group_id: string;
          status?: string;
          joined_at?: string;
          payment_status?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          group_id?: string;
          status?: string;
          joined_at?: string;
          payment_status?: string;
        };
      };
    };
  };
};