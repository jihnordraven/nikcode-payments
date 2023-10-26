import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { HelloPageTemplate } from './utils/hello-page.template'
import { ConfigService } from '@nestjs/config'
import { Public } from './utils/decorators/public.decorator'
import { ApiTags } from '@nestjs/swagger'

@Public()
@ApiTags('Util endpoints')
@Controller()
export class AppController {
	constructor(private readonly config: ConfigService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	public hello(): string {
		return HelloPageTemplate({ HOST: this.config.getOrThrow<string>('HOST') })
	}
}
