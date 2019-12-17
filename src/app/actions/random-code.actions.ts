import { RandomCode } from '../models/random-code.model'

export class AddRandomCode {
    static readonly type = '[PRINTER SERIALIZATION] AddCode'

    constructor(public payload: RandomCode[]) {}
}

export class ClearRandomCode {
    static readonly type = '[PRINTER SERIALIZATION] ClearCode'
}