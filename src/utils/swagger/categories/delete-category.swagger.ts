import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiHeader, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'

export const SwaggerToDeleteCategory = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Delete category' }),

		ApiParam({ name: 'id', description: 'category id' }),

		ApiHeader({
			name: 'Authorization',
			description: 'jwt access token',
			example:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
		}),

		ApiResponse({ status: HttpStatus.OK, description: 'Success. Category deleted' }),

		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: 'Category does not exist'
		}),

		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: 'Jwt access token is invalid, expired or missing'
		}),

		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Unable to delete category'
		})
	)
}
