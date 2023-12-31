import { Module } from '@nestjs/common'
import { CategoriesController } from './categories.controller'
import { CategoriesRepo } from './repositories/categories.repo'
import { CCH } from './commands'
import { CqrsModule } from '@nestjs/cqrs'
import { FilesModule } from '../files/files.module'

@Module({
	imports: [CqrsModule, FilesModule],
	controllers: [CategoriesController],
	providers: [CategoriesRepo, ...CCH]
})
export class CategoriesModule {}
