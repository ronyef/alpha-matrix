import { State, Action, StateContext, Selector } from '@ngxs/store'
import { Product } from './../models/product.model'
import { AddProduct, ClearProduct } from './../actions/product.actions'

export class ProductStateModel {
    products: Product[]
}

@State<ProductStateModel>({
    name: 'products',
    defaults: {
       products: []
    }
})

export class ProductState {

    @Selector()
    static getProducts(state: ProductStateModel) {
        return state.products
    }

    @Action(AddProduct)
    add({getState, patchState}: StateContext<ProductStateModel>, {payload}: AddProduct) {
        const state = getState()
        patchState({
            products: [...state.products, payload]
        })
    }

    @Action(ClearProduct)
    clear(ctx: StateContext<ProductStateModel>) {
        const state = ctx.getState()
        ctx.patchState({
            products: []
        })
    }
}