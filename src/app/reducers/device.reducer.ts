import { Action } from '@ngrx/store'
import { Device } from '../models/device.model'
import * as DeviceActions from '../actions/device.actions'

const initialState: Device = {
    directory: '/scanner'
}

export function reducer(state: Device[] = [initialState], action: DeviceActions.Actions) {
    switch(action.type) {
        case DeviceActions.ADD_DEVICE:
            return [...state, action.payload]
        default:
            return state
    }
}