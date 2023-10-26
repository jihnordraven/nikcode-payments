import { Payment } from '@prisma/client'

export type FindManyPaymentsResponse = {
	totalCount: number
	totalPages: number
	count: number
	pages: number
	payments: Payment[] | []
}
