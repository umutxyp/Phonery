const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { readFile, utils } = require('xlsx');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 400,
    frame: false,
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, 'phonery.ico'),
    title: 'Phonery - Phone Number Extractor',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

ipcMain.handle('open-dialog', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Excel Files', extensions: ['xlsx', 'xls'] }]
  });
  return result.filePaths;
});

ipcMain.handle('process-files', async (event, { files, prefixes }) => {
  const phones = new Set();
  
  for (const file of files) {
    try {
      const workbook = readFile(file.path);
      workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const data = utils.sheet_to_json(worksheet);
        
        data.forEach(row => {
          for (const key in row) {
            const value = row[key];
            if (value) {
              const phone = value.toString().trim();
              if (prefixes.some(prefix => phone.startsWith(prefix))) {
                phones.add(phone);
              }
            }
          }
        });
        
      });
    } catch (err) {
      console.error(`Error while processing file: ${file.path}`, err);
    }
  }
  
  return Array.from(phones).sort();
});


ipcMain.on('min', () => {
  mainWindow.minimize();
});

ipcMain.on('max', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
    mainWindow.webContents.send('unmaximize');
  } else {
    mainWindow.maximize();
    mainWindow.webContents.send('maximize');
  }
});

ipcMain.on('close', () => {
  mainWindow.close();
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
