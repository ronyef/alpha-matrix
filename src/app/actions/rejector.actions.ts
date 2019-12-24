import { Reject } from './../models/reject.model'

export class AddReject {
    static readonly type = '[SCANNER PROCESS] AddReject'
}

export class ResetReject {
    static readonly type = '[SCANNER PROCESS] ResetReject'
}