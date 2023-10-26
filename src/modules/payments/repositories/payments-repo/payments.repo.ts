import {
	BadRequestException,
	ForbiddenException,
	HttpStatus,
	Inject,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from '../../../../../prisma/prisma.service'
import { CreatePayment, DeletePayment } from '../../core/types'
import { Payment } from '@prisma/client'
import { red } from 'colorette'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { PaymentTTL } from '../../../../utils/constants'
import { UpdatePayment } from '../../core/types/update-payment.type'

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
		return this.returnPayment(payment)
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
		return this.returnPayment(payment)
	}

	public async update(data: UpdatePayment): Promise<Payment> {
		const payment: Payment = await this.checkPayment(data.id, data.userId)
		await this.cleanCache(payment)

		const updatedPayment: Payment = await this.prisma.payment
			.update({
				where: { ...payment },
				data: {
					amount: data.amount,
					description: data.description
				}
			})
			.catch((err: string) => {
				this.logger.error(red(err))
				throw new InternalServerErrorException('Unable to update a payment')
			})
		await this.setCache(updatedPayment)

		return updatedPayment
	}

	public async delete(data: DeletePayment): Promise<Payment> {
		const payment: Payment = await this.checkPayment(data.id, data.userId)
		await this.cleanCache(payment)

		const deletedPayment = await this.prisma.payment
			.delete({ where: { ...payment } })
			.catch((err: string) => {
				this.logger.error(red(err))
				throw new InternalServerErrorException('Unable to delete a payment')
			})

		return this.returnPayment(deletedPayment)
	}

	// Helpers
	private async setCache(payment: Payment): Promise<void> {
		await Promise.all([
			this.cache.set(`payment-id-${payment.id}`, payment, PaymentTTL)
		])
	}

	private async cleanCache(payment: Payment): Promise<void> {
		await Promise.all([this.cache.del(`payment-id-${payment.id}`)])
	}

	private async returnPayment(payment: Payment): Promise<Payment> {
		return {
			...payment,
			amount: parseFloat(payment.amount.toFixed(2))
		}
	}

	private async checkPayment(id: string, userId: string): Promise<Payment> {
		if (!id || !userId) throw new BadRequestException()

		const payment: Payment | null = await this.findById(id)
		if (!payment)
			throw new NotFoundException({
				message: 'Payment not found',
				error: 'Not found',
				status: HttpStatus.NOT_FOUND,
				context: 'payment-not-found'
			})

		if (payment.userId !== userId) throw new ForbiddenException()

		return payment
	}
}
