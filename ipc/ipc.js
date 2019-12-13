const { BrowserWindow, ipcMain }  = require('electron')
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline');
const { getNie, getNieExpiry, getBatch, getProductionDate, getExpiryDate, getSerial } = require('./scan-parser')

// const mainWindow = require('electron-main-window').getMainWindow()

const win = require('./../main')

module.exports = {

    detectScanner() {
        ipcMain.handle('detect-scanner', async(event, args) => {
            const result = await SerialPort.list()
            // console.log(result)
            return result
        })
    },

    connectScanner() {
        ipcMain.handle('connect-scanner', async(event, device) => {
            connectPort(device)

            return true
        })
    }
}


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

        // if (mainWindow !== null) {
        //     console.log('main window ada')
        //     mainWindow.webContents.send('qr-scanned', qrData)
        // }

        if (win !== null) {
            console.log('Win ada cooy')
            win.webContents.send('qr-scanned', qrData)
        } 

    });
}


    

