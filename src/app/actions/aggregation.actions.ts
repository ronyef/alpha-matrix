import { Aggregation } from './../models/aggregation.model'

export class AddAggregation {
    static readonly type = '[AGGREGATION PROCESS] AddAggregation'
    
    constructor(public payload: Aggregation) {}
}

export class ClearAggregation {
    static readonly type = '[SCANNER PROCESS] ClearAggregation'
}