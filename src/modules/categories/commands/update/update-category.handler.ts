import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateCategoryCommand } from './update-category.command'
import { CategoriesRepo } from '../../repositories/categories.repo'
import { Category } from '@prisma/client'
import { FilesService } from '../../../../modules/files/files.service'

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand> {
	constructor(
		protected readonly categoriesRepo: CategoriesRepo,
		protected readonly filesService: FilesService
	) {}

	public async execute({ input }: UpdateCategoryCommand): Promise<Category> {
		const { id, userId, name, description, color, file } = input

		const category: Category = await this.categoriesRepo.checkCategory(id, userId)

		let iconUrl: string | null

		if (file) {
			if (category.iconUrl) {
				await this.filesService.delete(category.iconUrl)
			}

			iconUrl = await this.filesService.upload(file)
		}

		const updatedCategory = await this.categoriesRepo.update(id, userId, {
			name,
			description,
			color,
			iconUrl
		})

		return updatedCategory
	}
}
