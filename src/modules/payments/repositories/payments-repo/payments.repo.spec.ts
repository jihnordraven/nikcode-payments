import { Test, TestingModule } from '@nestjs/testing'
import { PaymentsRepo } from './payments.repo'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { PrismaService } from '../../../../../prisma/prisma.service'
import { Cache } from 'cache-manager'

describe('PaymentsRepo', (): void => {
	let paymentsRepo: PaymentsRepo
	let cache: Cache
	let prismaService: PrismaService

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PaymentsRepo,
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

		paymentsRepo = module.get<PaymentsRepo>(PaymentsRepo)
		cache = module.get<Cache>(CACHE_MANAGER)
		prismaService = module.get<PrismaService>(PrismaService)
	})

	it('should be defined', (): void => {
		expect(paymentsRepo).toBeDefined()
	})
})
