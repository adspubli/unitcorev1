import { supabase } from './supabase';

export interface NormalizedGroup {
  id: string;
  service_id: string;
  owner_id: string;
  title: string;
  description: string;
  total: number; // total spots
  available: number; // available spots
  price_per_user: number;
  status: string;
  created_at: string;
  updated_at?: string;
}

// Normaliza un registro crudo de subscription_groups a la interfaz NormalizedGroup
export function normalizeGroup(raw: any): NormalizedGroup {
  return {
    id: raw.id,
    service_id: raw.service_id,
    owner_id: raw.owner_id,
    title: raw.title || 'Sin título',
    description: raw.description || '',
    total: raw.total_spots ?? raw.total_slots ?? raw.total ?? 0,
    available: raw.available_spots ?? (raw.total_spots ?? raw.total_slots ?? 0) - (raw.occupied_spots ?? 1),
    price_per_user: raw.price_per_user ?? raw.price_per_slot ?? raw.price ?? 0,
    status: raw.status || 'active',
    created_at: raw.created_at,
    updated_at: raw.updated_at
  };
}

export async function fetchActiveGroups(): Promise<NormalizedGroup[]> {
  const { data, error } = await supabase
    .from('subscription_groups')
    .select('*')
    .in('status', ['active', 'full']); // mostramos también full si se quiere
  if (error) {
    console.error('[fetchActiveGroups] error:', error.message);
    return [];
  }
  return (data || []).map(normalizeGroup);
}

export async function fetchGroupsByServiceId(serviceId: string): Promise<NormalizedGroup[]> {
  const { data, error } = await supabase
    .from('subscription_groups')
    .select('*')
    .eq('service_id', serviceId)
    .in('status', ['active', 'full']);
  if (error) {
    console.error('[fetchGroupsByServiceId] error:', error.message);
    return [];
  }
  return (data || []).map(normalizeGroup);
}
