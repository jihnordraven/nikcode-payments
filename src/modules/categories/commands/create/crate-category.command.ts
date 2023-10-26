import { CreateCategoryInput } from './types'

export class CreateCategoryCommand {
	constructor(public readonly input: CreateCategoryInput) {}
}
