import { Test, TestingModule } from '@nestjs/testing'
import { DeletePaymentHandler } from './delete-payment.handler'
import { PaymentsRepo } from '../../repositories/payments-repo/payments.repo'
import { BalancesRepo } from '../../../../modules/balances/repositories/balances.repo'

describe('DeletePaymentHandler', (): void => {
	let deletePaymentHandler: DeletePaymentHandler
	let paymentsRepo: PaymentsRepo

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DeletePaymentHandler,
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

		deletePaymentHandler = module.get<DeletePaymentHandler>(DeletePaymentHandler)
		paymentsRepo = module.get<PaymentsRepo>(PaymentsRepo)
	})

	it('should be defined', (): void => {
		expect(deletePaymentHandler).toBeDefined()
	})
})
