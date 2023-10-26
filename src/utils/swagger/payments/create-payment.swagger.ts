import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreatePaymentDto } from 'src/modules/payments/core/dtos'

export const SwaggerToCreatePayment = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Create payment' }),

		ApiHeader({
			name: 'Authorization',
			description: 'jwt access token',
			example:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
		}),

		ApiBody({
			type: CreatePaymentDto,
			examples: {
				example: {
					value: {
						type: 'INCOME',
						amount: 400,
						description: 'salary',
						categoryId: 'b883fcd8-2090-46c7-b872-32d41fbf1478'
					}
				}
			}
		}),

		ApiResponse({ status: HttpStatus.OK, description: 'Success. Payment created' }),

		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Invalid user input'
		}),

		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Jwt access token is invalid, expired or missing'
		}),

		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Unable to create a new payment'
		})
	)
}
