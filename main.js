const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const url = require('url')
const csv = require('fast-csv')

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline');
const { getNie, getNieExpiry, getBatch, getProductionDate, getExpiryDate, getSerial } = require('./ipc/scan-parser')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false
    },
    icon: `file://${__dirname}/dist/assets/logo.png`
  })

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/dist/hello-world/index.html#login`)

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


// const ipc = require('./ipc/ipc')

// ipc.detectScanner();
// ipc.connectScanner();

ipcMain.handle('detect-scanner', async(event, args) => {
  const result = await SerialPort.list()
  // console.log(result)
  return result
})

ipcMain.handle('connect-scanner', async(event, device) => {
  connectPort(device)

  return true
})

// fungsi konek scanner dan scanning
function connectPort(scanDevice) {
  const scanner = new SerialPort(scanDevice, {baudRate: 115200})

  scanner.on('error', function(err) {
      console.log(err.message)
  })

  const parser = new Readline();
  scanner.pipe(parser);

  parser.on('data', (line) => {
      // console.log(`> ${line}`)
      console.log('NIE: ',getNie(line));
      console.log('NIE Expiry: ',getNieExpiry(line));
      console.log('Batch: ',getBatch(line));
      console.log('Production Date: ',getProductionDate(line));
      console.log('Expiry Date: ',getExpiryDate(line));
      console.log('Serial No: ',getSerial(line));

      const nie = getNie(line)
      const nieExpiry = getNieExpiry(line)
      const batch = getBatch(line)
      const productionDate = getProductionDate(line)
      const expiryDate = getExpiryDate(line)
      const serialNo = getSerial(line)

      const qrData = {
          nie: nie,
          nieExpiry: nieExpiry,
          batch: batch,
          productionDate: productionDate,
          expiryDate: expiryDate,
          serialNo: serialNo
      }

      win.webContents.send('qr-scanned', qrData)

  });

  // Handle export scan csv
  ipcMain.handle('export-scan', (event, args) => {
    exportPath = dialog.showSaveDialogSync({title: 'Export CSV', defaultPath: 'export.csv'})
    return csv.writeToPath(exportPath, args, {headers: true})
      .on('error', err => {
        console.log(err)
        return false
      })
      .on('finish', () => {
        console.log('done writing')
        return true
      })
  })

}
