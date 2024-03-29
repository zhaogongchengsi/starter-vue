import { defineConfig, loadEnv } from "vite";
import path from "path";
import Vue from "@vitejs/plugin-vue";
import unocss from "unocss/vite";
import { presetAttributify, presetIcons, presetUno } from "unocss";
import presetChinese from "unocss-preset-chinese";
import autoImport from "unplugin-auto-import/vite";
import components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const dark = "class";

  const proxyprefix = env.VITE_PROXY;
  const proxytraget = env.VITE_TARGET;
  const usemock = env.VITE_USE_MOCK === "true" ? true : false;

  return {
    plugins: [
      Vue(),
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
        presets: [
          presetAttributify({ dark }),
          presetUno({ dark }),
          presetIcons({}),
          presetChinese(),
        ],
      }),
      usemock &&
      viteMockServe({
        mockPath: "mock", //mock文件路径，在根路径下创建一个mock文件
        prodEnabled: false, //生产环境下为false，这样就不会被打包到生产包中
        ignore: /^\_/, //忽略开始_路径
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
        "#": path.resolve("./src/types"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.prod.js",
      },
    },
    server: {
      port: 3050,
      host: "0.0.0.0",
      proxy: {
        [`^${proxyprefix}/.*`]: {
          target: proxytraget + proxyprefix,
          // target: proxytraget,
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
