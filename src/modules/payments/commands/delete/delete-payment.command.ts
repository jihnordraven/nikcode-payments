import { DeletePaymentInput } from './types'

export class DeletePaymentCommand {
	constructor(public readonly input: DeletePaymentInput) {}
}
