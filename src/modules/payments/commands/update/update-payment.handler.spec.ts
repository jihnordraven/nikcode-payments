import { Test, TestingModule } from '@nestjs/testing'
import { PaymentsRepo } from '../../repositories/payments-repo/payments.repo'
import { UpdatePaymentHandler } from './update-payment.handler'
import { BalancesRepo } from '../../../../modules/balances/repositories/balances.repo'

describe('UpdatePaymentHandler', (): void => {
	let updatePaymentHandler: UpdatePaymentHandler
	let paymentsRepo: PaymentsRepo

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UpdatePaymentHandler,
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

		updatePaymentHandler = module.get<UpdatePaymentHandler>(UpdatePaymentHandler)
		paymentsRepo = module.get<PaymentsRepo>(PaymentsRepo)
	})

	it('should be defined', (): void => {
		expect(updatePaymentHandler).toBeDefined()
	})
})
