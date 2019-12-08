import { Device } from './models/device.model'

export interface AppState {
    readonly device: Device[]
}