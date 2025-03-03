import { defineConfig} from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()] // plugin para entender o atalho de importações
})