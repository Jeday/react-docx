import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.js",
  external: ["react-reconciler", "docx"],
  output: {
    dir: "cjs",
    format: "cjs",
    exports: "named",
  },
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**",
      presets: [["@babel/preset-env", { targets: "defaults" }]],
    }),
  ],
};
