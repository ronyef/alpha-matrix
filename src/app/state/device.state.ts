import { State, Action, StateContext, Selector } from '@ngxs/store'
import { Device } from '../models/device.model'
import { DetectDevice, ConnectDevice } from '../actions/device.actions'

export class DeviceStateModel {
    devices: Device[]
}

@State<DeviceStateModel>({
    name: 'devices',
    defaults: {
        devices: []
    }
})

export class DeviceState {
    
    @Selector()
    static getDevices(state: DeviceStateModel) {
        return state.devices
    }

    @Action(DetectDevice)
    detect({getState, patchState}: StateContext<DeviceStateModel>, {payload}: DetectDevice) {
        const state = getState()
        patchState({
            devices: payload
        })
    }

    @Action(ConnectDevice)
    connect({getState, patchState}: StateContext<DeviceStateModel>, {payload}: ConnectDevice) {
        getState().devices.map((dvc) => {
            if (dvc.path == payload) {
                dvc.isConnected = true
            }
        })
    }
}
