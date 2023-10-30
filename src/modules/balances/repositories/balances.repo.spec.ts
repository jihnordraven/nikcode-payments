import { Test, TestingModule } from '@nestjs/testing'
import { BalancesRepo } from './balances.repo'
import { PrismaService } from '../../../../prisma/prisma.service'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { Balance, Prisma } from '@prisma/client'
import { NotFoundException } from '@nestjs/common'

describe('BalancesRepo', () => {
	let balancesRepo: BalancesRepo
	let prismaService: PrismaService
	let cacheManager: Cache

	const mockBalance: Balance = {
		id: 'Test id',
		amount: 0,
		name: 'Test name',
		userId: 'Test userId',
		createdAt: new Date(),
		updatedAt: new Date()
	}

	const mockFindByIdData = { id: mockBalance.id }

	const mockFindByUserIdData = { userId: mockBalance.userId }

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				BalancesRepo,
				{
					provide: PrismaService,
					useValue: {
						balance: jest.fn()
					}
				},
				{
					provide: CACHE_MANAGER,
					useValue: {}
				}
			]
		}).compile()

		balancesRepo = module.get<BalancesRepo>(BalancesRepo)
		prismaService = module.get<PrismaService>(PrismaService)
		cacheManager = module.get<Cache>(CACHE_MANAGER)
	})

	afterEach(() => {
		jest.clearAllMocks()
		jest.restoreAllMocks()
	})

	it('should be defined', () => {
		expect(balancesRepo).toBeDefined()
	})

	describe('Create balance', () => {
		it('should create a new balance', async () => {
			const data: Prisma.BalanceCreateInput = {
				userId: mockBalance.userId,
				name: mockBalance.name
			}

			jest.spyOn(prismaService.balance, 'create').mockResolvedValue(mockBalance)

			const result = await prismaService.balance.create({ data })

			expect(result).toBe(mockBalance)
			expect(prismaService.balance.create).toHaveBeenCalledTimes(1)
			expect(prismaService.balance.create).toHaveBeenCalledWith(data)
		})
	})

	describe('Find balance  by id', () => {
		it('should return a balance by id', async () => {
			jest.spyOn(prismaService.balance, 'findUnique').mockResolvedValue(mockBalance)

			const result = await prismaService.balance.findUnique({
				where: mockFindByIdData
			})

			expect(result).toBe(mockBalance)
			expect(prismaService.balance.findUnique).toHaveBeenCalledTimes(1)
			expect(prismaService.balance.findUnique).toHaveBeenCalledWith(
				mockFindByIdData
			)
		})

		it('should throw 404 error', async () => {
			jest.spyOn(prismaService.balance, 'findUnique').mockResolvedValue(null)

			const result = await prismaService.balance.findUnique({
				where: mockFindByIdData
			})

			expect(result).toBe(null)
			expect(prismaService.balance.findUnique).toHaveBeenCalledTimes(1)
			expect(prismaService.balance.findUnique).toHaveBeenCalledWith(
				mockFindByIdData
			)
		})
	})

	describe('Find by user id', () => {
		it('should return a balance', async () => {
			jest.spyOn(prismaService.balance, 'findUnique')

			const result = await prismaService.balance.findUnique({
				where: mockFindByUserIdData
			})

			expect(result).toBe(mockBalance)
			expect(prismaService.balance.findUnique).toHaveBeenCalledTimes(1)
			expect(prismaService.balance.findUnique).toHaveBeenCalledWith(
				mockFindByUserIdData
			)
		})

		it('should throw 404 error', async () => {
			jest.spyOn(prismaService.balance, 'findUnique').mockResolvedValue(null)

			const result = await prismaService.balance.findUnique({
				where: mockFindByUserIdData
			})

			expect(result).toBe(null)
			expect(prismaService.balance.findUnique).toHaveBeenCalledTimes(1)
			expect(prismaService.balance.findUnique).toHaveBeenCalledWith(
				mockFindByUserIdData
			)
		})
	})

	describe('Update amount at balance', () => {
		it('should update amount at balance', async () => {
			jest.spyOn(prismaService.balance, 'update').mockResolvedValue(mockBalance)

			const result = await prismaService.balance.update({
				where: { id: mockBalance.id },
				data: { id: mockBalance.id }
			})

			expect(result).toBe(mockBalance)
			expect(prismaService.balance.update).toHaveBeenCalledTimes(1)
		})

		it('should throw 404 if balance does not exist', async () => {
			jest.spyOn(prismaService.balance, 'update').mockRejectedValue(
				new NotFoundException()
			)

			const result = await prismaService.balance.update({
				where: { id: mockBalance.id },
				data: { id: mockBalance.id }
			})

			expect(result).rejects.toThrow(NotFoundException)
			expect(prismaService.balance.update).toHaveBeenCalledTimes(1)
		})
	})

	describe('Delete a balance', () => {
		it('should delete a balance by id', async () => {
			jest.spyOn(prismaService.balance, 'delete').mockResolvedValue(mockBalance)

			const result = await prismaService.balance.delete({
				where: mockFindByIdData
			})

			expect(result).toBe(mockBalance)
			expect(prismaService.balance.delete).toHaveBeenCalledWith(mockFindByIdData)
		})
	})
})
