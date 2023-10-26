import { ApiProperty } from '@nestjs/swagger'
import { PaymentType } from '@prisma/client'
import { IsEnum, IsNumber, IsOptional, IsString, Length } from 'class-validator'

export class UpdatePaymentDto {
	@ApiProperty({
		name: 'type',
		required: false,
		examples: ['INCOME', 'EXPENSE'],
		description: "payment's type"
	})
	@IsOptional()
	@IsString()
	@IsEnum(PaymentType)
	readonly type: PaymentType

	@ApiProperty({
		name: 'description',
		description: "payment's amount",
		required: false,
		type: Number,
		example: 100
	})
	@IsOptional()
	@IsNumber()
	readonly amount: number

	@ApiProperty({
		name: 'description',
		description: "payment's description",
		required: false,
		type: String,
		example: 'grocceries'
	})
	@IsOptional()
	@IsString()
	@Length(3, 200)
	readonly description: string
}
