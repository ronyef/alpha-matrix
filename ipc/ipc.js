const { ipcMain }  = require('electron')
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline');

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

    parser.on('data', line => console.log(`> ${line}`));
}


    

