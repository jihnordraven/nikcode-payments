import { PaymentType } from '@prisma/client'

export type CreatePaymentInput = {
	type: PaymentType
	amount: number
	description: string
	userId: string
}
