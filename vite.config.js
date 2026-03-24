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
        controlFlowFlatteningThreshold: 0.5,
        deadCodeInjection: false,
        debugProtection: false,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: false,
        selfDefending: false,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.5,
      },
    }),
  ],
})
