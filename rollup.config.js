import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import copy from "rollup-plugin-copy";
import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import { terser } from "rollup-plugin-terser";

const extensions = [".ts", ".tsx", ".jsx"];

export default [
  {
    input: "src/index.tsx",
    output: [
      {
        dir: "build/js",
        format: "esm",
        entryFileNames: "[name]-[hash].js",
        chunkFileNames: "[name]-chunkFile-[hash].js",
        assetFileNames: "[name].[hash][extname]",
      },
    ],
    preserveEntrySignatures: false,
    plugins: [
      del({ targets: "build" }),
      typescript(),
      nodeResolve({ extensions, exportConditions: ["solid"] }),
      babel({
        extensions,
        babelHelpers: "bundled",
        presets: [["solid", { generate: "dom", hydratable: true }]],
      }),
      copy({
        targets: [
          {
            src: ["public/favicon/*"],
            dest: "build/favicon",
          },
          {
            src: ["public/robots.txt"],
            dest: "build",
          },
        ],
      }),
      terser(),
    ],
    external: ["fusioncharts", "jquery-fusioncharts", "jquery"],
  },
  {
    input: "ssg/index.jsx",
    output: [
      {
        dir: "ssg/lib",
        exports: "auto",
        format: "cjs",
      },
    ],
    external: [
      "solid-js",
      "solid-js/web",
      "node-fetch",
      "fusioncharts",
      "jquery-fusioncharts",
      "jquery",
    ],
    plugins: [
      del({ targets: "ssg/lib" }),
      typescript(),
      nodeResolve({
        extensions,
        preferBuiltins: true,
        exportConditions: ["solid"],
      }),
      babel({
        extensions,
        babelHelpers: "bundled",
        presets: [
          ["solid", { generate: "ssr", hydratable: true, async: true }],
        ],
      }),
      json(),
    ],
  },
];
