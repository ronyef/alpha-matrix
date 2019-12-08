import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Device } from '../models/device.model'

export const ADD_DEVICE = '[DEVICE] Add'
export const REMOVE_DEVICE = '[DEVICE] Remove'

export class AddDevice implements Action {
    readonly type = ADD_DEVICE

    constructor(public payload: Device) {}
}

export class RemoveDevice implements Action {
    readonly type = REMOVE_DEVICE

    constructor(public payload: number) {}
}

export type Actions = AddDevice | RemoveDevice