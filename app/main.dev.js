/* eslint global-require: 1, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import MenuBuilder from './menu';

let mainWindow = null;
if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = ! ! process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    // await installExtensions();
  }

  mainWindow = new BrowserWindow({
    // show: false,
    width: 900,
    height: 650,
    minWidth: 900,
    minHeight: 650,
    frame: false
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (! mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.show();

  // 调试
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();


  // 关闭
  ipcMain.on('close', (event, arg) => {
    app.quit();
  });
  // 最大化
  ipcMain.on('max', (event, arg) => {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
    // win.setFullScreen(true);
  });
  // 最小化
  ipcMain.on('min', (event, arg) => {
    mainWindow.minimize();
  });

});

// import Express  from 'express';
// let apps = Express();
// let server = require('http').Server(apps);
//
// import Socket  from 'socket.io';
//
// console.log(Socket);
// let io = Socket(server);
// server.listen(19964);
// io.on('connection', (socket) => {
//   socket.on('news', (data) => {
//     mainWindow.webContents.send('news', data);
//   });
// });

// let io = require('socket.io')();
// io.on('connection', (socket) => {
//   socket.on('news', (data) => {
//     mainWindow.webContents.send('news', data);
//   });
// });
// io.listen(19964);


var net = require('net');
var timeout = 20000;// 超时
var listenPort = 19964;// 监听端口

var server = net.createServer(function (socket) {
  // 接收到数据
  socket.on('data', function (data) {
    try {
      let arr = JSON.parse(data.toString());
      // console.log(arr);
      mainWindow.webContents.send('news', arr);
    } catch (e) {

    }
  });
  server.on('close', function (data) {
    console.log('paole');
  });

  //数据错误事件
  socket.on('error', function (exception) {
    console.log('socket error:' + exception);
    socket.end();
  });

}).listen(listenPort);

//服务器错误事件
server.on("error", function (exception) {
  console.log("server error:" + exception);
});


