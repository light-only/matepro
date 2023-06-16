import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers:[VantResolver()]
    })
  ],
  server:{
    port:3000,
    host:true,
    open:false,
  },
  resolve:{
    alias:{
      //设置路径
      '~':path.resolve(__dirname,'./'),
      '@':path.resolve(__dirname,'./src')
    }
  }
})
