import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiHeader, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'

export const SwaggerToFindOnePayment = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Find one payment' }),

		ApiHeader({
			name: 'Authorization',
			description: 'jwt access token',
			example:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
		}),

		ApiParam({ name: 'id', required: true, type: String, description: 'payment id' }),

		ApiResponse({
			status: HttpStatus.OK,
			description: 'Success. Respond with a payment'
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
