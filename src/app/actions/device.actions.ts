import { Device } from '../models/device.model'

export class DetectDevice {
    static readonly type = '[SCANNER] DetectScanner'

    constructor(public payload: Device[]) {}
}

export class ConnectDevice {
    static readonly type = '[SCANNER] ConnectScanner'

    constructor(public payload: string) {}
}