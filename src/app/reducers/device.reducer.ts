import { Action } from '@ngrx/store'
import { Device } from '../models/device.model'
import * as DeviceActions from '../actions/device.actions'

const initialState: Device = {
    path: '/scanner',
    manufacturer: 'undefined',
    serialNumber: 'undefined',
    pnpId: 'undefined',
    locationId: 'undefined',
    vendorId: 'undefined',
    productId: 'undefined',
    isConnected: false
}

export function reducer(state: Device[] = [initialState], action: DeviceActions.Actions) {
    switch(action.type) {
        case DeviceActions.ADD_DEVICE:
            console.log(action.payload)
            return [...state, action.payload]
        default:
            return state
    }
}