import { type UserConfig } from "vite";
import nodeBuiltins from "builtin-modules/static";
import electronBuiltins from "electron-builtins";

const config: UserConfig = {
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
        entryFileNames: (info) => {
          // output current processing module name
          console.log(info.name);
          return `${info.name}.js`;
        },
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
    emptyOutDir: true,
  },
  ssr: {
    noExternal: true,
  },
};

export default config;
