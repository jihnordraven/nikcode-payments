import { Test, TestingModule } from '@nestjs/testing'
import { FindOnePaymentHandler } from './find-one-payment.handler'
import { PaymentsRepo } from '../../repositories/payments-repo/payments.repo'

describe('FindOnePaymentHandler', (): void => {
	let findOnePaymentHandler: FindOnePaymentHandler
	let paymentsRepo: PaymentsRepo

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				FindOnePaymentHandler,
				{
					provide: PaymentsRepo,
					useValue: {}
				}
			]
		}).compile()

		findOnePaymentHandler = module.get<FindOnePaymentHandler>(FindOnePaymentHandler)
		paymentsRepo = module.get<PaymentsRepo>(PaymentsRepo)
	})

	it('should be defined', (): void => {
		expect(findOnePaymentHandler).toBeDefined()
	})
})
