import { Test, TestingModule } from '@nestjs/testing'
import { PaymentsController } from './payments.controller'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { PaymentsQueryRepo } from '../repositories/payments-query-repo/payments-query.repo'

describe('PaymentsController', (): void => {
	let paymentsController: PaymentsController
	let queryBus: QueryBus
	let paymentsQueryRepo: PaymentsQueryRepo

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PaymentsController],
			providers: [
				{
					provide: CommandBus,
					useValue: {}
				},
				{
					provide: QueryBus,
					useValue: {}
				},
				{
					provide: PaymentsQueryRepo,
					useValue: {}
				}
			]
		}).compile()

		paymentsController = module.get<PaymentsController>(PaymentsController)
		queryBus = module.get<QueryBus>(QueryBus)
		paymentsQueryRepo = module.get<PaymentsQueryRepo>(PaymentsQueryRepo)
	})

	it('should be defined', (): void => {
		expect(paymentsController).toBeDefined()
	})
})
