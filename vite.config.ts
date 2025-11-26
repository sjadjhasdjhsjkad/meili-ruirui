import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
// 通过 npm install -D vite-plugin-svg-icons
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // 加入svg加载插件
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // SVG 图标目录
            symbolId: 'icon-[name]', // 生成的 symbol id
        }),
        svgLoader(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
})
