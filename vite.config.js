import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


const defaultConfig = {
  plugins: [vue()],
}
// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    
    const isDev = mode === 'development'

    return {
      ...defaultConfig,
      server: {
        proxy: {
          '/api': {
            target:  isDev ? 'http://localhost:80' : "https://floppa-inholland.herokuapp.com",
            changeOrigin: isDev,
            secure: !isDev
          }
        }
      }
    }
  } else {
    return defaultConfig
  }
})