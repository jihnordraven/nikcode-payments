import { ApiProperty } from '@nestjs/swagger'
import { IsHexColor, IsOptional, IsString, Length } from 'class-validator'

export class UpdateCategoryDto {
	@ApiProperty({ type: String, required: false, example: 'Education' })
	@IsOptional()
	@IsString()
	public readonly name: string

	@ApiProperty({
		type: String,
		required: false,
		example: 'This is an example description'
	})
	@IsOptional()
	@IsString()
	@Length(3, 200)
	public readonly description: string

	@ApiProperty({
		type: String,
		required: false,
		description: 'User can choose a color. Format: HEX',
		example: '#5g3fsc'
	})
	@IsOptional()
	@IsString()
	@IsHexColor()
	public readonly color: string
}
