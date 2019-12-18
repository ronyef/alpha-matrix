import { State, Action, StateContext, Selector } from '@ngxs/store'
import { Aggregation } from './../models/aggregation.model'
import { AddAggregation, ClearAggregation } from './../actions/aggregation.actions'

export class AggregationStateModel {
    aggregations: Aggregation[]
}

@State<AggregationStateModel>({
    name: 'aggregations',
    defaults: {
       aggregations: []
    }
})

export class AggregationState {

    @Selector()
    static getAggregations(state: AggregationStateModel) {
        return state.aggregations
    }

    @Action(AddAggregation)
    add({getState, patchState}: StateContext<AggregationStateModel>, {payload}: AddAggregation) {
        const state = getState()
        patchState({
            aggregations: [...state.aggregations, payload]
        })
    }

    @Action(ClearAggregation)
    clear(ctx: StateContext<AggregationStateModel>) {
        const state = ctx.getState()
        ctx.patchState({
            aggregations: []
        })
    }
}