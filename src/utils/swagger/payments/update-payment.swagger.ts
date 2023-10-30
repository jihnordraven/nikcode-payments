import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { UpdatePaymentDto } from '../../../modules/payments/core/dtos/update-payment.dto'

export const SwaggerToUpdatePayment = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Update payment' }),

		ApiHeader({
			name: 'Authorization',
			description: 'jwt access token',
			example:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
		}),

		ApiBody({
			type: UpdatePaymentDto,
			examples: {
				example: {
					value: {
						type: 'EXPENSE',
						amount: 200,
						description: 'grocceries',
						categoryId: '5e579dc8-73b2-11ee-b962-0242ac120002'
					}
				}
			}
		}),

		ApiResponse({ status: HttpStatus.OK, description: 'Success. Payment updated' }),

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
			description: 'Unable to update the payment'
		})
	)
}
