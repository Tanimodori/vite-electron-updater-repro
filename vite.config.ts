import { type UserConfig } from "vite";
import nodeBuiltins from "builtin-modules/static";
import electronBuiltins from "electron-builtins";

const config: UserConfig = {
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
      external: (src) => {
        const [name] = src.split("/");
        const externalNames = [
          ...nodeBuiltins,
          ...nodeBuiltins.map((name) => `node:${name}`),
          ...electronBuiltins,
        ];
        return externalNames.includes(name);
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
