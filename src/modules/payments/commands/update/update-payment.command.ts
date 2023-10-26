import { UpdatePayment } from '../../core/types/update-payment.type'

export class UpdatePaymentCommand {
	constructor(public readonly input: UpdatePayment) {}
}
