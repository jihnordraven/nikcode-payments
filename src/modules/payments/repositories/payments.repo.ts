import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { PrismaService } from '../../../../prisma/prisma.service'
import { CreatePayment } from '../core/types'
import { Payment } from '@prisma/client'
import { red } from 'colorette'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { PaymentTTL } from '../../../utils/constants'

@Injectable()
export class PaymentsRepo {
	private readonly logger: Logger = new Logger(PaymentsRepo.name)

	constructor(
		@Inject(CACHE_MANAGER) private readonly cache: Cache,
		private readonly prisma: PrismaService
	) {}

	public async create(data: CreatePayment): Promise<Payment> {
		const payment: Payment = await this.prisma.payment
			.create({ data })
			.catch((err: string) => {
				this.logger.error(red(err))
				throw new InternalServerErrorException('Unable to create a new payment')
			})

		await this.setCache(payment)
		return payment
	}

	public async findById(id: string): Promise<Payment | null> {
		const payment: Payment | null = await this.cache.get<Payment | null>(
			`payment-id-${id}`
		)
		if (!payment) {
			const payment: Payment | null = await this.prisma.payment.findUnique({
				where: { id }
			})
			if (!payment) return null
			await this.setCache(payment)
			return payment
		}
		return payment
	}

	public async update(id: string, data: any): Promise<any> {}

	// Helpers
	private async setCache(payment: Payment): Promise<void> {
		await Promise.all([
			this.cache.set(`payment-id-${payment.id}`, payment, PaymentTTL)
		])
	}

	private async cleanCache(payment: Payment): Promise<void> {
		await Promise.all([this.cache.del(`payment-id-${payment.id}`)])
	}
}
