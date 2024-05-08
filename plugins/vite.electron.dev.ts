import type { Plugin } from 'vite'
import type { AddressInfo } from 'net'
import { spawn } from 'child_process'
import esbuild from 'esbuild'
import electron from 'electron'
import fs from 'fs'

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
export const ElectronDevPlugin = (): Plugin => {
  return {
    name: 'electron-dev-plugin',
    configureServer(server) {
      esbuildBackground()
      server.httpServer?.once('listening', () => {
        //读取vite 服务信息
        const addressInfo = server.httpServer?.address() as AddressInfo
        console.log(addressInfo.port)
        const IP = `http://localhost:${addressInfo.port}`
        console.log(IP)
        //electron 不识别ts ,需要编译为js'
        //进程传参
        let ElectronProcess = spawn(electron as unknown as string, ['dist/background.js', IP])
        //监听文件,进行热更新
        fs.watchFile('src/background.ts', () => {
          ElectronProcess.kill()
          esbuildBackground()
          ElectronProcess = spawn(electron as unknown as string, ['dist/background.js', IP])
        })
        console.log('123')
        ElectronProcess.stderr.on('data', (data: string) => {
          console.log('日志', data.toString())
        })
      })
    }
  }
}
