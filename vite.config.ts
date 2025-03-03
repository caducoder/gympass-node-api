import { defineConfig, configDefaults} from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()], // plugin para entender o atalho de importações
  test: {
    exclude: [
      ...configDefaults.exclude,
      
    ],
    coverage: {
      provider: 'v8',
      exclude: ["build/**"],
      include: ["src/services/**", "src/repositories/in-memory/**"]
    }
  }
})