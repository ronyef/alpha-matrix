import { State, Action, StateContext, Selector } from '@ngxs/store'
import { RandomCode } from '../models/random-code.model'
import { AddRandomCode, ClearRandomCode } from '../actions/random-code.actions'

export class RandomCodeModel {
    randomCodes: RandomCode[]
}

@State<RandomCodeModel>({
    name: 'randomCodes',
    defaults: {
        randomCodes: []
    }
})
export class RandomCodeState {

    @Selector()
    static getRandomCodes(state: RandomCodeModel) {
        return state.randomCodes
    }

    @Action(AddRandomCode)
    add(ctx: StateContext<RandomCodeModel>, {payload}: AddRandomCode) {
        const state = ctx.getState()
        ctx.patchState ({
            randomCodes: payload
        })
    }

    @Action(ClearRandomCode)
    clear(ctx: StateContext<RandomCodeModel>) {
        const state = ctx.getState()
        ctx.patchState ({
            randomCodes: []
        })
    }

}