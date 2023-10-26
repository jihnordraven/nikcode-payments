import { PaymentType } from '@prisma/client'

export type UpdatePayment = {
	id: string
	userId: string
	amount: number
	type: PaymentType
	description: string
	categoryId?: string
}
