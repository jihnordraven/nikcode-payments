import { CreateCategoryCommand } from './create/crate-category.command'
import { CreateCategoryHandler } from './create/create-category.handler'

import { DeleteCategoryCommand } from './delete/delete-category.command'
import { DeleteCategoryHandler } from './delete/delete-category.handler'

import { UpdateCategoryCommand } from './update/update-category.command'
import { UpdateCategoryHandler } from './update/update-category.handler'

export const CC = { CreateCategoryCommand, UpdateCategoryCommand, DeleteCategoryCommand }

export const CCH = [CreateCategoryHandler, UpdateCategoryHandler, DeleteCategoryHandler]
