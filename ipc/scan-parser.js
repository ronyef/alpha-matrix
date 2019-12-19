// Program untuk mengkonversi scanned QR code menjadi data siap kirim 

const scannedString = '(90)NA18191405006(91)220221(10)123(11)191113(17)201113(21)165';

module.exports = {

    getNie: (code) => {
        const re = /\(90\)\w+/;
        const val = (code.match(re) || []).join('');
        return val.substr(4, val.length);
    },

    getNieExpiry: (code) => {
        const re = /\(91\)\w+/;
        const val = (code.match(re) || []).join('');
        return val.substr(4, val.length);
    },

    getBatch: (code) => {
        const re = /\(10\)\w+/;
        const val = (code.match(re) || []).join('');
        return val.substr(4, val.length);
    },

    getProductionDate:  (code) => {
        const re = /\(11\)\w+/;
        const val = (code.match(re) || []).join('');
        return val.substr(4, val.length);
    },

    getExpiryDate: (code) => {
        const re = /\(17\)\w+/;
        const val = (code.match(re) || []).join('');
        return val.substr(4, val.length);
    },

    getSerial: (code) => {
        const re = /\(21\).+/;
        const val = (code.match(re) || []).join('');
        return val.substr(4, val.length);
    }

}



