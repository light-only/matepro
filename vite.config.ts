import { defineConfig ,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({mode, command})=>{
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env
  return {
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
    },
    base: VITE_APP_ENV === 'production' ? '/domain2/' : '/',
  }
})
