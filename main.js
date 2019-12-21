const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron')
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
    height: 700,
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

Menu.setApplicationMenu(null)

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
      alertMessage('error', err.message)
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
        
      if (plc) {
        plc.write('1')
        console.log('rejector sent!')
      } else {
        console.log(plc)
        alertMessage('error', 'Rejector not connected!')
      }

  });

}

//AGGREGATE SCANNER
ipcMain.handle('connect-ag-scanner', async(event, device) => {

  const agScanner = new SerialPort(device, {baudRate: 115200})

  agScanner.on('error', function(err) {
      console.log(err.message)
  })

  const parser = new Readline();
  agScanner.pipe(parser);

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

      win.webContents.send('ag-qr-scanned', qrData)

  });

  return true
})

var plc

// Connect Rejector
ipcMain.handle('connect-rejector', async(event, device) => {
  const rejector = new SerialPort(device, {baudRate: 115200})

  rejector.on('error', function(err) {
      console.log(err.message)
      alertMessage('Error', err.message)
  })

  // console.log(rejector)
  plc = rejector
  return true

})

// Handle export scan csv
ipcMain.handle('export-scan', (event, args) => {
  exportPath = dialog.showSaveDialogSync({title: 'Export CSV', defaultPath: 'export.csv'})
  if (exportPath) {
    csv.writeToPath(exportPath, args, {headers: true})
    .on('error', err => {
      alertMessage('error', err)
      console.log(err)
    })
    .on('finish', () => {
      msg = 'CSV successfully exported to' + exportPath
      alertMessage('info', msg)
      console.log('done writing')
    })
    return true
  } else {
    alertMessage('info', 'Export canceled!')
    return false
  }
  
})

// Handle clear scanned products
ipcMain.handle('clear-products', (event, args) => {
  res = dialog.showMessageBoxSync({
    type: 'question',
    title: 'Confirmation',
    buttons: ['Yes', 'No'],
    message: 'Are you sure to clear data?'
  })
  return res
})

// Handle export random serials
ipcMain.handle('export-serials', (event, args) => {
  exportPath = dialog.showSaveDialogSync({ title: 'Export Serials', defaultPath: 'serials.csv'})
  if (exportPath) {
    csv.writeToPath(exportPath, args, {headers: false})
    .on('error', err => {
      alertMessage('error', err)
      console.log(err)
    })
    .on('finish', () => {
      msg = 'CSV successfully exported to' + exportPath
      alertMessage('info', msg)
      console.log('done writing')
    })
    return true
  } else {
    alertMessage('info', 'Export canceled!')
    return false
  }
})

ipcMain.handle('export-full-code', (even, args) => {
  exportPath = dialog.showSaveDialogSync({ title: 'Export Raw Code', defaultPath: 'rawCodes.csv'})
  if (exportPath) {
    csv.writeToPath(exportPath, args, {headers: false})
    .on('error', err => {
      alertMessage('error', err)
      console.log(err)
    })
    .on('finish', () => {
      msg = 'CSV successfully exported to' + exportPath
      status = 'info'
      alertMessage(status, msg)
      console.log('done writing')
    })
    return true
  } else {
    alertMessage('info', 'Export canceled!')
    return false
  }
})

function alertMessage(status, message) {
  dialog.showMessageBox({type: status, message: message, title: 'Export Status'})
}

// Handle export aggregation csv
ipcMain.handle('export-aggregation', (event, args) => {
  exportPath = dialog.showSaveDialogSync({title: 'Export CSV', defaultPath: 'export.csv'})
  if (exportPath) {
    csv.writeToPath(exportPath, args, {headers: true})
    .on('error', err => {
      alertMessage('error', err)
      console.log(err)
    })
    .on('finish', () => {
      alertMessage('info', 'CSV successfully exported to' + exportPath)
      console.log('done writing')
    })
    return true
  } else {
    alertMessage('info', 'Export cancelled!')
    return false
  }
  
})

// Handle clear aggregation products
ipcMain.handle('clear-aggregations', (event, args) => {
  res = dialog.showMessageBoxSync({
    type: 'question',
    title: 'Confirmation',
    buttons: ['Yes', 'No'],
    message: 'Are you sure to clear data?'
  })
  return res
})



