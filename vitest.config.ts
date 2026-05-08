import { defineConfig } from 'vitest/config'

export const baseConfig = {
    test: {
        exclude: ['**/dist/**', '**/node_modules/**'],
        coverage: {
            enabled: true,
            provider: 'v8' as const,
            reporter: ['text', 'html', 'json-summary'],
            reportsDirectory: './coverage',
            include: ['five-fog/src/**/*.ts'],
            exclude: [
                '**/*.test.ts',
                '**/dist/**',
                '**/node_modules/**',
            ],
            thresholds: process.env.CI
                ? {}
                : {
                    lines: 90,
                    functions: 90,
                    statements: 90,
                    branches: 70,
                },
        },
    },
}

export default defineConfig(baseConfig)
