import { ApiProperty } from '@nestjs/swagger'
import { PaymentType } from '@prisma/client'
import {
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Length
} from 'class-validator'

export class UpdatePaymentDto {
	@ApiProperty({ required: false, examples: ['INCOME', 'EXPENSE'] })
	@IsOptional()
	@IsString()
	@IsEnum(PaymentType)
	readonly type: PaymentType

	@ApiProperty({ required: false, type: Number, example: 100 })
	@IsOptional()
	@IsNumber()
	readonly amount: number

	@ApiProperty({ required: false, type: String, example: 'grocceries' })
	@IsOptional()
	@IsString()
	@Length(3, 200)
	readonly description: string
}
