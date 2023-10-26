import { Test, TestingModule } from '@nestjs/testing'
import { BalancesController } from './balances.controller'
import { BalancesRepo } from '../repositories/balances.repo'

describe('BalancesController', (): void => {
	let balancesController: BalancesController
	let balancesRepo: BalancesRepo

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [BalancesController],
			providers: [
				{
					provide: BalancesRepo,
					useValue: {}
				}
			]
		}).compile()

		balancesController = module.get<BalancesController>(BalancesController)
		balancesRepo = module.get<BalancesRepo>(BalancesRepo)
	})

	it('should be defined', (): void => {
		expect(balancesController).toBeDefined()
	})
})
