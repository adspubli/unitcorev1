import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

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
      group_members: {
        Row: {
          id: string;
          group_id: string;
          user_id: string;
          status: 'pending' | 'active' | 'inactive';
          joined_at: string;
        };
        Insert: {
          id?: string;
          group_id: string;
          user_id: string;
          status?: 'pending' | 'active' | 'inactive';
          joined_at?: string;
        };
        Update: {
          id?: string;
          group_id?: string;
          user_id?: string;
          status?: 'pending' | 'active' | 'inactive';
          joined_at?: string;
        };
      };
    };
  };
};