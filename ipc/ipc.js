const { ipcMain }  = require('electron')
const SerialPort = require('serialport')

module.exports = {
    detectScanner() {
        ipcMain.handle('detect-scanner', async(event, args) => {
            const result = await SerialPort.list()
            // console.log(result)
            return result
        })
    }
}

