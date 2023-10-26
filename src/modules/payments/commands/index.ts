import { CreatePaymentCommand } from './create/create-payment.command'
import { CreatePaymentHandler } from './create/create-payment.handler'

import { DeletePaymentCommand } from './delete/delete-payment.command'
import { DeletePaymentHandler } from './delete/delete-payment.handler'

import { UpdatePaymentCommand } from './update/update-payment.command'
import { UpdatePaymentHandler } from './update/update-payment.handler'

export const PC = { CreatePaymentCommand, UpdatePaymentCommand, DeletePaymentCommand }

export const PCH = [CreatePaymentHandler, UpdatePaymentHandler, DeletePaymentHandler]
