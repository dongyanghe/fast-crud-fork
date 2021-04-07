import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import visualizer from "rollup-plugin-visualizer";
import path from "path";

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  console.log("args", command, mode);

  let devAlias = {};
  if (mode === "development") {
    devAlias = {
      "@fast-crud/fast-crud/dist/lang": path.resolve(
        "../fast-crud/src/local/lang"
      ),
      "@fast-crud/fast-crud": path.resolve("../fast-crud/src"),
      "@fast-crud/fast-crud-extends": path.resolve("../fast-crud-extends/src")
    };
  }

  console.log("devAlias", devAlias);
  return {
    plugins: [
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      }),
      vue()
    ],
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment"
    },
    resolve: {
      alias: {
        ...devAlias,
        "/@": path.resolve("./src")
      },
      dedupe: ["vue"]
    },
    build: {
      rollupOptions: {
        plugins: [visualizer()]
      }
    },
    server: {
      proxy: {
        // with options
        "/api": {
          target: "http://www.docmirror.cn:7070"
        }
      }
    }
  };
};
