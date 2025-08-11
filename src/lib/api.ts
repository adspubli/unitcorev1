import { supabase } from './supabase';

export async function fetchServices() {
  const { data, error } = await supabase.from('services').select('*');
  if (error) throw error;
  return data;
}

export async function fetchPlansByService(serviceId: string) {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('service_id', serviceId);
  if (error) throw error;
  return data;
}
