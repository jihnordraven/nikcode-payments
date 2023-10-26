import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { red } from 'colorette'
import { v4 } from 'uuid'

@Injectable()
export class FilesService {
	private readonly s3 = new S3Client({
		region: this.config.getOrThrow<string>('AWS_S3_REGION')
	})
	private bucket = this.config.getOrThrow<string>('AWS_S3_BUCKET')

	private readonly logger: Logger = new Logger(FilesService.name)

	constructor(private readonly config: ConfigService) {}

	public async upload(file: Express.Multer.File) {
		let iconUrl: string = ''

		if (file) {
			const filename: string = v4() + '-' + file.originalname

			const upload = new Upload({
				client: this.s3,
				params: {
					Bucket: this.bucket,
					Key: filename,
					Body: file.buffer
				}
			})
			try {
				const s3ObjectUrl: string = this.config.getOrThrow('AWS_S3_OBJECT_URL')
				iconUrl = `${s3ObjectUrl}/${filename}`

				await upload.done()
			} catch (err: unknown) {
				this.logger.error(red(`${err}`))
				throw new InternalServerErrorException('Unable to upload an image')
			}

			return iconUrl
		}
	}

	public async delete(Key: string): Promise<void> {
		await this.s3.send(
			new DeleteObjectCommand({
				Bucket: this.bucket,
				Key
			})
		)
	}
}
