import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      // NOTE: never inline secrets here. A previous version defined
      // `process.env.API_KEY` = GEMINI_API_KEY, which baked the key into the
      // client bundle (readable by any visitor). If an AI feature is added
      // back, call the provider from a serverless function so the key stays
      // server-side.
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
