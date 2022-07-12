import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
const isH5 = process.env.UNI_PLATFORM === "h5";
// 假如要加载一些 commonjs 模块，需要引入这个插件，很多地图的sdk都是 commonjs，假如引用报错需要引入它并添加到 `plugins` 里
// import commonjs from "@rollup/plugin-commonjs";
import vwt from "weapp-tailwindcss-webpack-plugin/vite";
import postcssWeappTailwindcssRename from "weapp-tailwindcss-webpack-plugin/postcss";
import path from "path";

import { createStyleImportPlugin, VantResolve } from "vite-plugin-style-import";

const postcssPlugins = [require("autoprefixer")(), require("tailwindcss")()];

if (!isH5) {
    postcssPlugins.push(
        require("postcss-rem-to-responsive-pixel")({
            rootValue: 32,
            propList: ["*"],
            transformUnit: "rpx",
        })
    );
    postcssPlugins.push(postcssWeappTailwindcssRename());
}

export default defineConfig({
    plugins: [
        uni(),
        isH5 ? undefined : vwt(),
        createStyleImportPlugin({
            resolves: [VantResolve()],
            libs: [
                {
                    libraryName: "vant",
                    esModule: true,
                    resolveStyle: (name) => {
                        return `../es/${name}/style/index`;
                    },
                },
            ],
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    css: {
        postcss: {
            plugins: postcssPlugins,
        },
    },
});
