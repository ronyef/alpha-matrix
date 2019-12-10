import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'
import {shareReplay, map} from 'rxjs/operators'
import {Device} from './../models/device.model'
import { deviceReducer } from '../reducers'

@Injectable()
export class DevicesStoreService {


    private readonly _devices = new BehaviorSubject<Device[]>([])

    readonly devices$ = this._devices.asObservable()

    readonly connectedDevice$ = this.devices$.pipe(
        map(devices => devices.filter(device => device.isConnected))
    )

    readonly unConnectedDevice$ = this.devices$.pipe(
        map(devices => devices.filter(device => !device.isConnected))
    )

    get devices(): Device[] {
        return this._devices.getValue()
    }

    set devices(val: Device[]) {
        this._devices.next(val)
    }

    async addDevice(device: Device) {
        
        const tmpDevice: Device = device
        tmpDevice.isConnected = false

        this.devices = [
            ...this.devices,
            tmpDevice
        ]

        console.log(this._devices)
    }

    detectDevice(devices: Device[]) {

        let tmpDevices = devices

        tmpDevices.forEach(device => {
            device.isConnected = false
        });

        this.devices = tmpDevices
        console.log(this._devices)
    }

}
