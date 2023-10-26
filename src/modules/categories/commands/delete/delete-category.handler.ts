import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteCategoryCommand } from './delete-category.command'
import { Category } from '@prisma/client'
import { CategoriesRepo } from '../../repositories/categories.repo'
import { ConfigService } from '@nestjs/config'
import { FilesService } from '../../../../modules/files/files.service'

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements ICommandHandler<DeleteCategoryCommand> {
	constructor(
		protected readonly config: ConfigService,
		protected readonly categoriesRepo: CategoriesRepo,
		protected readonly filesService: FilesService
	) {}

	public async execute({ input }: DeleteCategoryCommand): Promise<Category> {
		const { id, userId } = input

		const category: Category = await this.categoriesRepo.delete(id, userId)

		if (category.iconUrl) {
			await this.filesService.delete(category.iconUrl)
		}

		return category
	}
}
