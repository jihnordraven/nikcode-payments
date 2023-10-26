import {
	Body,
	Controller,
	Delete,
	FileTypeValidator,
	HttpCode,
	HttpStatus,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	ParseUUIDPipe,
	Patch,
	Post,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { CreateCategoryDto, UpdateCategoryDto } from './core/dtos'
import { FileInterceptor } from '@nestjs/platform-express'
import { CurrentUser } from '../../utils/decorators/current-user.decorator'
import { CommandBus } from '@nestjs/cqrs'
import { CC } from './commands'
import { Category } from '@prisma/client'

@Controller('categories')
export class CategoriesController {
	constructor(private readonly commandBus: CommandBus) {}

	@Post('create')
	@HttpCode(HttpStatus.OK)
	@UseInterceptors(FileInterceptor('image'))
	public async create(
		@CurrentUser('userId', ParseUUIDPipe) userId: string,
		@Body() dto: CreateCategoryDto,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new FileTypeValidator({ fileType: /\.(jpg|jpeg|png)$/ }),
					new MaxFileSizeValidator({ maxSize: 100 * 1024 })
				]
			})
		)
		file: Express.Multer.File
	): Promise<Category> {
		return this.commandBus.execute(
			new CC.CreateCategoryCommand({ userId, file, ...dto })
		)
	}

	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	@UseInterceptors(FileInterceptor('image'))
	public async update(
		@CurrentUser('userId') userId: string,
		@Param('id') id: string,
		@Body() dto: UpdateCategoryDto,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new FileTypeValidator({ fileType: /\.(jpg|jpeg|png)$/ }),
					new MaxFileSizeValidator({ maxSize: 100 * 1024 })
				]
			})
		)
		file: Express.Multer.File
	): Promise<any> {
		return this.commandBus.execute(
			new CC.UpdateCategoryCommand({ id, userId, file, ...dto })
		)
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	public async delete(
		@CurrentUser('userId', ParseUUIDPipe) userId: string,
		@Param('id', ParseUUIDPipe) id: string
	): Promise<any> {
		return this.commandBus.execute(new CC.DeleteCategoryCommand({ id, userId }))
	}
}
