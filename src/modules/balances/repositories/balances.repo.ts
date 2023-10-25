import {
	Inject,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from '../../../../prisma/prisma.service'
import { Balance } from '@prisma/client'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { BalanceTTL } from 'src/utils/constants'
import { red } from 'colorette'
import { CreateBalance } from '../core/types/create-balance.type'

@Injectable()
export class BalancesRepo {
	private readonly logger: Logger = new Logger(BalancesRepo.name)

	constructor(
		@Inject(CACHE_MANAGER) private readonly cache: Cache,
		private readonly prisma: PrismaService
	) {}

	public async create(data: CreateBalance): Promise<Balance> {
		const balance: Balance = await this.prisma.balance
			.create({ data })
			.catch((err: string) => {
				this.logger.error(red(err))
				throw new InternalServerErrorException(err)
			})

		await this.setCache(balance)
		return balance
	}

	public async findById(id: string): Promise<Balance | null> {
		const balance: Balance | null = await this.cache.get<Balance | null>(
			`balance-id-${id}`
		)
		if (!balance) {
			const balance: Balance | null = await this.prisma.balance.findUnique({
				where: { id }
			})
			if (!balance) return null
			await this.setCache(balance)
			return balance
		}
		return balance
	}

	public async findByUserId(userId: string): Promise<Balance | null> {
		const balance: Balance | null = await this.cache.get<Balance | null>(
			`balance-userId-${userId}`
		)
		if (!balance) {
			const balance: Balance | null = await this.prisma.balance.findUnique({
				where: { userId }
			})
			if (!balance) return null
			await this.setCache(balance)
			return balance
		}
		return balance
	}

	public async updateAmount(id: string, amount: number): Promise<Balance> {
		const balance: Balance | null = await this.findById(id)
		if (!balance) throw new NotFoundException('Balance not found')

		await this.cleanCache(balance)

		const updatedBalance: Balance = await this.prisma.balance
			.update({
				where: { ...balance },
				data: { amount }
			})
			.catch((err: string) => {
				this.logger.error(red(err))
				throw new InternalServerErrorException(
					"Unalbe to update balance's amount"
				)
			})

		await this.setCache(balance)
		return updatedBalance
	}

	// Helpers
	private async setCache(balance: Balance): Promise<void> {
		await Promise.all([
			this.cache.set(`balance-id-${balance.id}`, balance, BalanceTTL),
			this.cache.set(`balance-userId-${balance.userId}`, balance, BalanceTTL)
		])
	}

	private async cleanCache(balance: Balance): Promise<void> {
		await Promise.all([
			this.cache.del(`balance-id-${balance.id}`),
			this.cache.del(`balance-userId-${balance.userId}`)
		])
	}
}
