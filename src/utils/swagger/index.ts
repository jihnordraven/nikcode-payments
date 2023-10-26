import { SwaggerToCreateCategory } from './categories/create-category.swagger'
import { SwaggerToDeleteCategory } from './categories/delete-category.swagger'
import { SwaggerToUpdateCategory } from './categories/update-category.swagger'
import { SwaggerToCreatePayment } from './payments/create-payment.swagger'
import { SwaggerToDeletePayment } from './payments/delete-payment.swagger'
import { SwaggerToFindManyPayments } from './payments/find-many-payments.swagger'
import { SwaggerToFindOnePayment } from './payments/find-one-payment.swagger'
import { SwaggerToUpdatePayment } from './payments/update-payment.swagger'

export * from './swagger.config'

export const SWAGGER_PAYMENTS = {
	SwaggerToCreatePayment,
	SwaggerToDeletePayment,
	SwaggerToFindManyPayments,
	SwaggerToFindOnePayment,
	SwaggerToUpdatePayment
}

export const SWAGGER_CATEGORIES = {
	SwaggerToCreateCategory,
	SwaggerToDeleteCategory,
	SwaggerToUpdateCategory
}
