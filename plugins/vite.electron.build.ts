import type { Plugin } from 'vite'
import esbuild from 'esbuild'
import fs from 'fs'
import * as electronBuilder from 'electron-builder'
import path from 'path'
const esbuildBackground = () => {
  esbuild.buildSync({
    entryPoints: ['src/background.ts'],
    bundle: true,
    outfile: 'dist/background.js',
    platform: 'node',
    target: 'node14',
    external: ['electron']
  })
}
//等vite 打包完成后再进行electron 打包
export const ElectronBuildPlugin = (): Plugin => {
  return {
    name: 'electron-Build',
    async closeBundle() {
      await esbuildBackground()
      const json = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
      json.main = 'background.js'
      fs.writeFileSync('dist/package.json', JSON.stringify(json, null, 4), 'utf-8')
      fs.mkdirSync('dist/node_modules')
      electronBuilder.build({
        config: {
          appId: 'com.example.app',
          productName: 'vite-electron',
          directories: {
            output: path.join(process.cwd(), 'release'), //输出目录
            app: path.join(process.cwd(), 'dist') //app目录
          },
          files: ['**/*'],
          asar: true, //压缩
          nsis: {
            //安装配置
            oneClick: false, //取消一键安装
            allowToChangeInstallationDirectory: true //允许修改安装目录
          }
        }
      })
    }
  }
}
