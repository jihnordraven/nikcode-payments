import { FindOnePaymentInput } from './types'

export class FindOnePaymentQuery {
	constructor(public readonly input: FindOnePaymentInput) {}
}
