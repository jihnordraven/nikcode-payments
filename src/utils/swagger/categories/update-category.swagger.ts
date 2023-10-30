import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { UpdateCategoryDto } from '../../../modules/categories/core/dtos'

export const SwaggerToUpdateCategory = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'Update category' }),

		ApiBody({
			type: UpdateCategoryDto,
			examples: {
				example: {
					value: {
						name: 'Travel and vacation',
						description: 'travel and vacation costs',
						color: '#5gf34f',
						file: 'jpg | png | jpeg images. Max size - 1mb'
					}
				}
			}
		}),

		ApiParam({ name: 'id', description: 'category id' }),

		ApiHeader({
			name: 'Authorization',
			description: 'jwt access token',
			example:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
		}),

		ApiResponse({ status: HttpStatus.OK, description: 'Success. Category updated' }),

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
			description: 'Unable to update category'
		})
	)
}
