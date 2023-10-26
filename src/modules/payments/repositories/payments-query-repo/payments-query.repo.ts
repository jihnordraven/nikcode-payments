import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../../prisma/prisma.service'
import { FindManyPayments, FindManyPaymentsResponse } from '../../core/types'
import { Payment, Prisma } from '@prisma/client'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { PaymentTTL } from '../../../../utils/constants'

@Injectable()
export class PaymentsQueryRepo {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cache: Cache,
		private readonly prisma: PrismaService
	) {}

	public async findMany(data: FindManyPayments): Promise<FindManyPaymentsResponse> {
		const { userId, page, limit, query, orderDate, orderAmount } = data

		const skip: number = (page - 1) * limit

		const whereOrder: Prisma.PaymentWhereInput = {
			userId
		}
		if (query) {
			whereOrder.description = {
				contains: query,
				mode: 'insensitive'
			}
		}

		const myOrderBy = []
		if (orderDate) {
			myOrderBy.push({ createdAt: orderDate })
		}
		if (orderAmount) myOrderBy.push({ amount: orderAmount })

		const payments: Payment[] | [] = await this.prisma.payment.findMany({
			where: whereOrder,
			skip,
			take: limit,
			orderBy: myOrderBy
		})

		await this.cache.set(`payments-${payments}`, payments, PaymentTTL)

		const totalCount = await this.prisma.payment.count({ where: { userId } })
		const totalPages = Math.ceil(totalCount / limit)
		const count = payments.length
		const pages = Math.ceil(count / limit)

		return { totalCount, totalPages, count, pages, payments }
	}
}
