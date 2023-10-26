import { CreatePaymentInput } from './types'

export class CreatePaymentCommand {
	constructor(public readonly input: CreatePaymentInput) {}
}
