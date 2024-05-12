import { type MenuItemConstructorOptions, type MenuItem } from 'electron'
import * as path from 'path'
const { ipcMain, app, BrowserWindow, Menu } = require('electron')
app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'My Electron App',
    frame: false,
    icon: path.join(__dirname, '../public/favicon.ico'), // 设置窗口图标
    webPreferences: {
      nodeIntegration: true, // 可以渲染进程调用node的api,默认禁止
      contextIsolation: false, //关闭渲染进程沙箱
      webSecurity: false //关闭同源策略检测
    }
  })

  // 创建菜单模板
  const template: MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          click() {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [{ role: 'reload' }, { role: 'toggleDevTools' }]
    }
  ]

  // 根据模板创建菜单
  const menu = Menu.buildFromTemplate(template)

  // 设置应用程序菜单
  Menu.setApplicationMenu(menu)

  //win.webContents.openDevTools()
  if (process.argv[2]) {
    //开发环境
    mainWindow.loadURL(process.argv[2])
  } else {
    mainWindow.loadFile('index.html')
  }
  ipcMain.on('minimize-window', () => {
    mainWindow.minimize()
  })

  // 监听渲染进程发送的最大化/还原窗口消息
  ipcMain.on('toggle-maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore()
    } else {
      mainWindow.maximize()
    }
    // 向渲染进程发送当前最大化状态
    mainWindow.webContents.send('maximize-status', mainWindow.isMaximized())
  })

  // 监听渲染进程发送的关闭窗口消息
  ipcMain.on('close-window', () => {
    mainWindow.close()
  })

  ipcMain.on('start-drag', (event) => {
    event.sender.send('start-drag')
  })

  ipcMain.on('drag-window', (event) => {
    if (document.body.style.cursor !== 'grabbing') {
      document.body.style.cursor = 'grab'
    }
  })

  ipcMain.on('end-drag', (event) => {
    event.sender.send('end-drag')
  })
})
