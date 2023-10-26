export type CreateCategoryInput = {
	name: string
	userId: string
	description?: string
	color?: string
	file?: Express.Multer.File
}
