import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeletePaymentCommand } from './delete-payment.command'
import { PaymentsRepo } from '../../repositories/payments-repo/payments.repo'
import { Payment, PaymentType } from '@prisma/client'
import { BalancesRepo } from '../../../../modules/balances/repositories/balances.repo'
import { BadRequestException } from '@nestjs/common'

@CommandHandler(DeletePaymentCommand)
export class DeletePaymentHandler implements ICommandHandler<DeletePaymentCommand> {
	constructor(
		protected readonly paymentsRepo: PaymentsRepo,
		protected readonly balancesRepo: BalancesRepo
	) {}

	public async execute({ input }: DeletePaymentCommand): Promise<Payment> {
		const deletedPayment = await this.paymentsRepo.delete(input)

		const balance = await this.balancesRepo.findByUserId(input.userId)

		switch (deletedPayment.type) {
			case PaymentType.INCOME:
				const incameAmount: number = (balance.amount -= deletedPayment.amount)
				await this.balancesRepo.updateAmount(balance.id, incameAmount)
				break

			case PaymentType.EXPENSE:
				const expensedAmount: number = (balance.amount += deletedPayment.amount)
				await this.balancesRepo.updateAmount(balance.id, expensedAmount)
				break

			default:
				throw new BadRequestException()
		}

		return deletedPayment
	}
}
