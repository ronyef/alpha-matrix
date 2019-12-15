import { State, Action, StateContext, Selector } from '@ngxs/store'
import { Subscription } from './../models/subscription.model'
import { SubscribeToEvent } from './../actions/subscription.actions'


export class SubscriptionStateModel {
    subscription: Subscription
}

@State<SubscriptionStateModel>({
    name: 'subscription',
    defaults: {
        subscription: {
            qrScanned: false,
            qrAggregated: false
        }
    }
})

export class SubscriptionState {

    @Selector()
    static getSubscription(state: SubscriptionStateModel) {
        return state.subscription
    }

    @Action(SubscribeToEvent.ToScan)
    subscribeToScan(ctx: StateContext<SubscriptionStateModel>, {payload}: SubscribeToEvent.ToScan) {
        const state = ctx.getState()
        ctx.patchState({
            subscription: {...state.subscription, qrScanned: payload}
        })
    }
    
}