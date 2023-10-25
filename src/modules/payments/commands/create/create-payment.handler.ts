import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreatePaymentCommand } from './create-payment.command'
import { Balance, Payment, PaymentType } from '@prisma/client'
import { BalancesRepo } from '../../../../modules/balances/repositories/balances.repo'
import { BadRequestException } from '@nestjs/common'
import { PaymentsRepo } from '../../repositories/payments.repo'

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler implements ICommandHandler<CreatePaymentCommand> {
	constructor(
		private readonly balancesRepo: BalancesRepo,
		private readonly paymentsRepo: PaymentsRepo
	) {}

	public async execute({ input }: CreatePaymentCommand): Promise<Payment> {
		const { type, amount, userId } = input

		const balance: Balance = await this.balancesRepo.findByUserId(userId)

		switch (type) {
			case PaymentType.INCOME:
				const incomedAmount: number = (balance.amount += amount)
				await this.balancesRepo.updateAmount(balance.id, incomedAmount)
				break

			case PaymentType.EXPENSE:
				const expensedAmount: number = (balance.amount -= amount)
				await this.balancesRepo.updateAmount(balance.id, expensedAmount)
				break

			default:
				throw new BadRequestException('Invalid payment type')
		}

		const payment: Payment = await this.paymentsRepo.create(input)

		return payment
	}
}
