import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdatePaymentCommand } from './update-payment.command'
import { PaymentsRepo } from '../../repositories/payments-repo/payments.repo'
import { Balance, Payment, PaymentType } from '@prisma/client'
import { BalancesRepo } from '../../../../modules/balances/repositories/balances.repo'
import { BadRequestException } from '@nestjs/common'

@CommandHandler(UpdatePaymentCommand)
export class UpdatePaymentHandler implements ICommandHandler<UpdatePaymentCommand> {
	constructor(
		protected readonly paymentsRepo: PaymentsRepo,
		protected readonly balancesRepo: BalancesRepo
	) {}

	public async execute({ input }: UpdatePaymentCommand): Promise<Payment> {
		const payment: Payment = await this.paymentsRepo.findById(input.id)

		const updatedPayment: Payment = await this.paymentsRepo.update(input)

		const balance: Balance = await this.balancesRepo.findByUserId(input.userId)

		if (input.amount && input.type) {
			switch (input.type) {
				case PaymentType.INCOME:
					await this.balancesRepo.updateAmount(
						balance.id,
						(balance.amount -= payment.amount)
					)

					await this.balancesRepo.updateAmount(
						balance.id,
						(balance.amount += input.amount)
					)
					break

				case PaymentType.EXPENSE:
					await this.balancesRepo.updateAmount(
						balance.id,
						(balance.amount += payment.amount)
					)

					await this.balancesRepo.updateAmount(
						balance.id,
						(balance.amount -= input.amount)
					)
					break

				default:
					throw new BadRequestException()
			}
		}

		return updatedPayment
	}
}
