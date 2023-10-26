import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCategoryDto } from '../../../modules/categories/core/dtos'

export const SwaggerToCreateCategory = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Create category for payments' }),

		ApiHeader({
			name: 'Authorization',
			description: 'jwt access token',
			example:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
		}),

		ApiBody({
			type: CreateCategoryDto,
			examples: {
				example: {
					value: {
						name: 'Education',
						description: 'education costs',
						color: '#ffffff',
						file: 'jpg | jpeg | png format. Max - 1mb'
					}
				}
			}
		}),

		ApiResponse({ status: HttpStatus.OK, description: 'Success. Category created' }),

		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Invalid user input'
		}),

		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Jwt access token is invalid, expired or missing'
		})
	)
}
