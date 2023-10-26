import { UpdateCategoryInput } from './types'

export class UpdateCategoryCommand {
	constructor(public readonly input: UpdateCategoryInput) {}
}
