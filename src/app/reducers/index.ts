import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

//device ngrx
import { Action } from '@ngrx/store'
import { Device } from '../models/device.model'
import * as DeviceActions from '../actions/device.actions'

export interface State {

}

export const reducers: ActionReducerMap<State> = {

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];


//device reducer
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

export function deviceReducer(state: Device[] = [initialState], action: DeviceActions.Actions) {
  switch(action.type) {
      case DeviceActions.ADD_DEVICE:
          return [...state, action.payload]
      default:
          return state
  }
}