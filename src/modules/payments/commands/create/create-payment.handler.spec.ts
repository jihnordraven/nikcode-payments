import { Test, TestingModule } from '@nestjs/testing'
import { PaymentsRepo } from '../../repositories/payments-repo/payments.repo'
import { CreatePaymentHandler } from './create-payment.handler'
import { BalancesRepo } from '../../../../modules/balances/repositories/balances.repo'

describe('CreatePaymentHandler', (): void => {
	let createPaymentHandler: CreatePaymentHandler
	let paymentsRepo: PaymentsRepo

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CreatePaymentHandler,
				{
					provide: PaymentsRepo,
					useValue: {}
				},
				{
					provide: BalancesRepo,
					useValue: {}
				}
			]
		}).compile()

		createPaymentHandler = module.get<CreatePaymentHandler>(CreatePaymentHandler)
		paymentsRepo = module.get<PaymentsRepo>(PaymentsRepo)
	})

	it('should be defined', (): void => {
		expect(createPaymentHandler).toBeDefined()
	})
})
