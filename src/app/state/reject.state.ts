import { State, Action, StateContext, Selector } from '@ngxs/store'
import { Reject } from '../models/reject.model'
import { AddReject, ResetReject } from '../actions/rejector.actions'

export class RejectStateModel {
    reject: Reject
}

@State<RejectStateModel>({
    name: 'reject',
    defaults: {
        reject: {
            count: 0
        }
    }
})

export class RejectState {

    @Selector()
    static getReject(state: RejectStateModel) {
        return state.reject
    }

    @Action(AddReject)
    addReject(ctx: StateContext<RejectStateModel>) {
        const state = ctx.getState()

        ctx.patchState({
            reject: { ...state.reject, count: state.reject.count + 1}
        })
    }

    @Action(ResetReject) 
    resetReject(ctx: StateContext<RejectStateModel>) {
        const state = ctx.getState()

        ctx.patchState({
            reject: {
                count: 0
            }
        })
    }
    
}