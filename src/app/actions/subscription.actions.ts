import { Subscription } from '../models/subscription.model'

export namespace SubscribeToEvent {
    export class ToScan {
        static readonly type = '[SCANNER PROCESS] SubscribeToScan'

        constructor(public payload: boolean) {}
    }

    export class ToAggregate {
        static readonly type = '[AGGREGATION PROCESS] SubscribeToAggregate'

        constructor(public payload: boolean) {}
    }

    export class ToRejector {
        static readonly type = '[SCANNER PROCESS] SubscribeToRejector'

        constructor(public payload: boolean) {}
    }
}