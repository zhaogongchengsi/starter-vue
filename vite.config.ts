import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import unocss from "unocss/vite";
import { presetAttributify, presetUno, presetIcons } from "unocss";
import autoImport from "unplugin-auto-import/vite";
import components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";

import { pageGenerateRouter } from "vite-plugin-pages-generate-router";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const dark = "class";

  const proxyprefix = env.VITE_PROXY;
  const proxytraget = env.VITE_TARGET;
  const routermode = env.ROYTING_MODE;
  const usemock = env.VITE_USE_MOCK === "true" ? true : false;

  return {
    plugins: [
      vue(),
      autoImport({
        resolvers: [ArcoResolver()],
        imports: ["vue", "@vueuse/core"],
      }),
      components({
        resolvers: [
          ArcoResolver({
            sideEffect: true,
          }),
        ],
      }),
      unocss({
        presets: [presetAttributify({ dark }), presetUno({ dark }), presetIcons({})],
      }),
      usemock &&
        viteMockServe({
          mockPath: "mock", //mock文件路径，在根路径下创建一个mock文件
          prodEnabled: false, //生产环境下为false，这样就不会被打包到生产包中
          ignore: /^\_/, //忽略开始_路径
        }),
      routermode === "static" &&
        pageGenerateRouter({
          generateDir: "./src/views",
        }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
        "#": path.resolve("./src/types"),
      },
    },
    server: {
      proxy: {
        [`^${proxyprefix}/.*`]: {
          target: proxytraget + proxyprefix,
          changeOrigin: true,
          rewrite: (path: string) => {
            const reg = new RegExp("^\\" + proxyprefix + "/");
            return path.replace(reg, "");
          },
        },
      },
    },
  };
});
