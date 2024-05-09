import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // 可以渲染进程调用node的api,默认禁止
      contextIsolation: false, //关闭渲染进程沙箱
      webSecurity: false //关闭同源策略检测
    }
  })
  console.log(process.argv[2])
  //win.webContents.openDevTools()
  if (process.argv[2]) {
    //开发环境
    win.loadURL(process.argv[2])
  } else {
    win.loadFile('index.html')
  }
})
