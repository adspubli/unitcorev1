import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// Cargamos explícitamente las variables y las inyectamos con define para diagnosticar por qué no aparecen.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // carga todo el .env
  const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = env;
  console.log('[Vite config] Loaded env:', { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY_PRESENT: !!VITE_SUPABASE_ANON_KEY });
  return {
  plugins: [react(), svgr()],
    optimizeDeps: { exclude: ['lucide-react'] },
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(VITE_SUPABASE_URL),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(VITE_SUPABASE_ANON_KEY),
    },
  };
});
