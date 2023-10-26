export type UpdateCategoryInput = {
	id: string
	userId: string
	name?: string
	description?: string
	color?: string
	file?: Express.Multer.File
}
