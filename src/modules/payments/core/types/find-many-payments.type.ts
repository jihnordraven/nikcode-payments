import { PaymentType, Prisma } from '@prisma/client'

export type FindManyPayments = {
	userId: string
	page?: number
	limit?: number
	query?: string
	orderDate?: Prisma.SortOrder
	orderAmount?: Prisma.SortOrder
	orderType?: PaymentType
	categoryId: string
}
