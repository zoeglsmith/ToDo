const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const reload = require('electron-reload');  // Add this line

let mainWindow;
const tasks = []; // In-memory storage for tasks

// Enable live-reloading during development
if (process.env.NODE_ENV === 'development') {
  reload(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit',
  });
}

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools(); // Corrected typo here

  // Listen for addTask request from renderer process
  ipcMain.on('addTask', (event, task) => {
    tasks.push(task);
    mainWindow.webContents.send('updateTasks', tasks);
  });

  // Listen for requestTasks request from renderer process
  ipcMain.on('requestTasks', (event) => {
    mainWindow.webContents.send('updateTasks', tasks);
  });
});
