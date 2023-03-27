import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname + '/admin/src',
  plugins: [react()],
  resolve: {
    alias: {
      '@botmate/ui': path.join(__dirname, '../../shared/ui/src'),
      '@botmate/helper-plugin': path.join(__dirname, '../../core/helper-plugin/src'),
    },
  },
});
