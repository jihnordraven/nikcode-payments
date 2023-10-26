import { Test, TestingModule } from '@nestjs/testing'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { BalancesRepo } from './balances.repo'
import { PrismaService } from '../../../../prisma/prisma.service'

describe('BalancesRepo', (): void => {
	let balancesRepo: BalancesRepo
	let cache: Cache
	let prismaService: PrismaService

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				BalancesRepo,
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

		balancesRepo = module.get<BalancesRepo>(BalancesRepo)
		cache = module.get<Cache>(CACHE_MANAGER)
		prismaService = module.get<PrismaService>(PrismaService)
	})

	it('should be defined', (): void => {
		expect(balancesRepo).toBeDefined()
	})
})
