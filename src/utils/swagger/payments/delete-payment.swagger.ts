import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiHeader, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'

export const SwaggerToDeletePayment = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Delete payment' }),

		ApiHeader({
			name: 'Authorization',
			description: 'jwt access token',
			example:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
		}),

		ApiParam({ name: 'id', example: 'b883fcd8-2090-46c7-b872-32d41fbf1478' }),

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
			description: 'Unable to delete the payment'
		})
	)
}
