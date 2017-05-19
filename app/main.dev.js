import { app, BrowserWindow, ipcMain } from 'electron';
// import MenuBuilder from './menu';

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
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', async () => {


  mainWindow = new BrowserWindow({
    width: 900,
    height: 650,
    minWidth: 900,
    minHeight: 650,
    frame: false
  });

  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    mainWindow.webContents.openDevTools();// 调试
  }

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    if (! mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.show();

  // 调试


  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();


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

const net = require('net');
const listenPort = 19964;// 监听端口
const server = net.createServer(function (socket) {
  // 接收到数据
  socket.on('data', function (data) {
    try {
      let arr = JSON.parse(data.toString());
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
    // socket.end();
  });

}).listen(listenPort);

//服务器错误事件
server.on("error", function (exception) {
  console.log("server error:" + exception);
});


