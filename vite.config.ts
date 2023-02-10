/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: __dirname,
  build: {
    ssr: true,
    outDir: "dist",
    lib: {
      entry: "src/index.ts",
      formats: ["cjs"],
    },
    rollupOptions: {
      output: {
        preserveModules: true,
      },
    },
    commonjsOptions: {
      ignoreDynamicRequires: true,
    },
    emptyOutDir: true,
  },
  ssr: {
    noExternal: true,
  },
};

export default config;
