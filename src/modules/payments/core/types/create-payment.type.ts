import { PaymentType } from '@prisma/client'

export type CreatePayment = {
	type: PaymentType
	amount: number
	description: string
	userId: string
}
