import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiHeader, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger'

export const SwaggerToFindManyPayments = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Find all payments' }),

		ApiHeader({
			name: 'Authorization',
			description: 'jwt access token',
			example:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
		}),

		ApiQuery({ name: 'query', required: false, description: 'search query' }),
		ApiQuery({ name: 'page', required: false, description: 'page number' }),
		ApiQuery({ name: 'limit', required: false, description: 'limit number' }),
		ApiQuery({ name: 'orderDate', required: false, description: 'order by date' }),
		ApiQuery({
			name: 'orderAmount',
			required: false,
			description: 'order by amount'
		}),

		ApiResponse({
			status: HttpStatus.OK,
			description: 'Success. Response with an array of Payments'
		}),

		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Jwt access token is invalid, expired or missing'
		})
	)
}
