import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscatorPlugin from 'rollup-plugin-obfuscator'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    obfuscatorPlugin({
      global: true,
      options: {
        compact: true,
        controlFlowFlattening: true,
        deadCodeInjection: true,
        debugProtection: true,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: false,
        selfDefending: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75,
      },
    }),
  ],
})
