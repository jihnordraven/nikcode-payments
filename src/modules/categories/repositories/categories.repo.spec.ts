import { Test, TestingModule } from '@nestjs/testing'
import { CategoriesRepo } from './categories.repo'
import { PrismaService } from 'prisma/prisma.service'
import { CACHE_MANAGER } from '@nestjs/cache-manager'

describe('CategoriesRepo', () => {
	let categoriesRepo: CategoriesRepo

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CategoriesRepo,
				{
					provide: PrismaService,
					useValue: {}
				},
				{
					provide: CACHE_MANAGER,
					useValue: {}
				}
			]
		}).compile()
	})
})
