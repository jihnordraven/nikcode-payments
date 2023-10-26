import { CACHE_MANAGER } from '@nestjs/cache-manager'
import {
	ForbiddenException,
	HttpStatus,
	Inject,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException
} from '@nestjs/common'
import { Cache } from 'cache-manager'
import { PrismaService } from '../../../../prisma/prisma.service'
import { Category } from '@prisma/client'
import { CreateCategory, UpdateCategory } from '../core/types'
import { red } from 'colorette'
import { CategoryTTL } from '../../../utils/constants'

@Injectable()
export class CategoriesRepo {
	private readonly logger: Logger = new Logger(CategoriesRepo.name)

	constructor(
		@Inject(CACHE_MANAGER) private readonly cache: Cache,
		private readonly prisma: PrismaService
	) {}

	public async create(data: CreateCategory): Promise<Category> {
		const category: Category = await this.prisma.category
			.create({
				data: {
					name: data.name,
					userId: data.userId,
					description: data.description,
					color: data.color,
					iconUrl: data.iconUrl
				}
			})
			.catch((err: string) => {
				this.logger.error(red(err))
				throw new InternalServerErrorException('Unable to create a new category')
			})

		await this.setCache(category)
		return category
	}

	public async findMany() {}

	public async findById(id: string): Promise<Category> {
		const category: Category | null = await this.cache.get<Category | null>(
			`category-id-${id}`
		)
		if (!category) {
			const category: Category | null = await this.prisma.category.findUnique({
				where: { id }
			})
			if (!category) return null
			await this.setCache(category)
			return category
		}
		return category
	}

	public async update(
		id: string,
		userId: string,
		data: UpdateCategory
	): Promise<Category> {
		const category: Category = await this.checkCategory(id, userId)
		await this.cleanCache(category)

		const updatedCategory: Category = await this.prisma.category
			.update({
				where: { id },
				data
			})
			.catch((err: string) => {
				this.logger.error(red(err))
				throw new InternalServerErrorException('Unable to update a category')
			})

		await this.setCache(updatedCategory)
		return updatedCategory
	}

	public async delete(id: string, userId: string): Promise<Category> {
		const category: Category = await this.checkCategory(id, userId)
		await this.cleanCache(category)

		const deletedCategory: Category = await this.prisma.category
			.delete({ where: { id } })
			.catch((err: string) => {
				this.logger.error(err)
				throw new InternalServerErrorException('Unable to delete a category')
			})

		return deletedCategory
	}

	// Helpers
	private async setCache(category: Category): Promise<void> {
		await Promise.all([
			this.cache.set(`category-id-${category.id}`, category, CategoryTTL)
		])
	}

	private async cleanCache(category: Category): Promise<void> {
		await Promise.all([this.cache.del(`category-id-${category.id}`)])
	}

	public async checkCategory(id: string, userId: string): Promise<Category> {
		const category: Category | null = await this.findById(id)
		if (!category)
			throw new NotFoundException({
				message: 'Category not found',
				error: 'Not found',
				status: HttpStatus.NOT_FOUND
			})

		if (category.userId !== userId) throw new ForbiddenException()

		return category
	}
}
