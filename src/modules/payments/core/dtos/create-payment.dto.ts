import { PaymentType } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'

export class CreatePaymentDto {
	@IsNotEmpty()
	@IsString()
	@IsEnum(PaymentType)
	readonly type: PaymentType

	@IsNotEmpty()
	@IsNumber()
	readonly amount: number

	@IsNotEmpty()
	@IsString()
	@Length(3, 200)
	readonly description: string
}
