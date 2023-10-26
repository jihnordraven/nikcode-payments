import { ApiProperty } from '@nestjs/swagger'
import { PaymentType } from '@prisma/client'
import {
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
	Length
} from 'class-validator'
import { v4 } from 'uuid'

export class CreatePaymentDto {
	@ApiProperty({
		name: 'type',
		description: "payment's type",
		examples: ['INCOME', 'EXPENSE'],
		required: true
	})
	@IsNotEmpty()
	@IsString()
	@IsEnum(PaymentType)
	public readonly type: PaymentType

	@ApiProperty({
		name: 'amount',
		type: String,
		description: "payment's amount",
		example: 100,
		required: true
	})
	@IsNotEmpty()
	@IsNumber()
	public readonly amount: number

	@ApiProperty({
		name: 'description',
		type: String,
		description: "payment's description",
		example: "month's salary",
		required: false
	})
	@IsOptional()
	@IsString()
	@Length(3, 200)
	public readonly description: string

	@ApiProperty({
		name: 'categoryId',
		type: String,
		description: "payment's categoryId",
		example: v4(),
		required: false
	})
	@IsOptional()
	@IsString()
	@IsUUID()
	public readonly categoryId?: string
}
