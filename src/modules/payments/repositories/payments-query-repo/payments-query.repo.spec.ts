import { Test, TestingModule } from '@nestjs/testing'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { PrismaService } from '../../../../../prisma/prisma.service'
import { Cache } from 'cache-manager'
import { PaymentsQueryRepo } from './payments-query.repo'

describe('PaymentsQueryRepo', (): void => {
	let paymentsQueryRepo: PaymentsQueryRepo
	let cache: Cache
	let prismaService: PrismaService

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PaymentsQueryRepo,
				{
					provide: CACHE_MANAGER,
					useValue: {}
				},
				{
					provide: PrismaService,
					useValue: {}
				}
			]
		}).compile()

		paymentsQueryRepo = module.get<PaymentsQueryRepo>(PaymentsQueryRepo)
		cache = module.get<Cache>(CACHE_MANAGER)
		prismaService = module.get<PrismaService>(PrismaService)
	})

	it('should be defined', (): void => {
		expect(paymentsQueryRepo).toBeDefined()
	})
})
