import { DeleteCategoryInput } from './types'

export class DeleteCategoryCommand {
	constructor(public readonly input: DeleteCategoryInput) {}
}
