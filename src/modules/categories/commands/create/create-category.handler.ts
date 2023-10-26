import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateCategoryCommand } from './crate-category.command'
import { CategoriesRepo } from '../../repositories/categories.repo'
import { Category } from '@prisma/client'
import { ConfigService } from '@nestjs/config'
import { FilesService } from '../../../../modules/files/files.service'

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
	constructor(
		protected readonly config: ConfigService,
		protected readonly categoriesRepo: CategoriesRepo,
		protected readonly filesService: FilesService
	) {}

	public async execute({ input }: CreateCategoryCommand): Promise<Category> {
		let iconUrl: string = ''

		if (input.file) {
			iconUrl = await this.filesService.upload(input.file)
		}

		return this.categoriesRepo.create({ ...input, iconUrl })
	}
}
