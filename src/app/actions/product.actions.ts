import {Product} from './../models/product.model'

export class AddProduct {
    static readonly type = '[SCANNER PROCESS] AddProduct'
    
    constructor(public payload: Product) {}
}