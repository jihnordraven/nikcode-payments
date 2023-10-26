import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import { winstonLogger } from './utils/logger'
import {
	InternalServerErrorException,
	Logger,
	RequestMethod,
	ValidationPipe
} from '@nestjs/common'
import { blue, red } from 'colorette'
import { SwaggerConfig } from './utils/swagger'
import * as Sentry from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'
import { SentryFilter, ValidatePipeOptions } from './utils/errors-handlers'

type NestApp = NestExpressApplication

const logger: Logger = new Logger('bootstrap')

const bootstrap = async (): Promise<void> => {
	const app: NestApp = await NestFactory.create<NestApp>(AppModule, winstonLogger)

	app.setGlobalPrefix('api/v1', { exclude: [{ path: '/', method: RequestMethod.GET }] })
	app.enableCors({
		credentials: true,
		origin: [
			'http://localhost:3000',
			'https://nikcode-payments.vercel.app',
			'https://www.payments.nikcode.com'
		],
		methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'HEAD']
	})
	app.useGlobalPipes(new ValidationPipe(ValidatePipeOptions))

	const config: ConfigService = app.get<ConfigService>(ConfigService)

	const PORT: number = config.getOrThrow<number>('PORT')
	const HOST: string = config.getOrThrow<string>('HOST')
	const MODE: string = config.getOrThrow<string>('MODE')

	if (MODE !== 'prod') SwaggerConfig(app)

	Sentry.init({
		dsn: config.getOrThrow('SENTRY_DSN'),
		integrations: [new ProfilingIntegration()],
		tracesSampleRate: 1.0,
		profilesSampleRate: 1.0
	})
	const { httpAdapter } = app.get(HttpAdapterHost)
	app.useGlobalFilters(new SentryFilter(httpAdapter))

	try {
		app.listen(PORT)
		logger.log(
			blue(`Server is listening PORT: ${PORT} on HOST: ${HOST} with MODE: ${MODE}`)
		)
	} catch (err: unknown) {
		logger.error(red(`Something went wrong... Learn more at: ${err}`))
		throw new InternalServerErrorException(err)
	}
}

bootstrap()
