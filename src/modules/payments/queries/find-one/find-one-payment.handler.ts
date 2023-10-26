import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { FindOnePaymentQuery } from './find-one-payment.query'
import { Payment } from '@prisma/client'
import { PaymentsRepo } from '../../repositories/payments-repo/payments.repo'
import { ForbiddenException, HttpStatus, NotFoundException } from '@nestjs/common'

@QueryHandler(FindOnePaymentQuery)
export class FindOnePaymentHandler implements IQueryHandler<FindOnePaymentQuery> {
	constructor(protected readonly paymentsRepo: PaymentsRepo) {}

	public async execute({ input }: FindOnePaymentQuery): Promise<any> {
		const { id, userId } = input

		const payment: Payment | null = await this.paymentsRepo.findById(id)
		if (!payment)
			throw new NotFoundException({
				message: 'Payment not found',
				error: 'Not found',
				status: HttpStatus.NOT_FOUND
			})

		if (payment.userId !== userId) throw new ForbiddenException()

		return payment
	}
}
