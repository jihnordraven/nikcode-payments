import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'
import { INestMicroservice, Logger } from '@nestjs/common'
import { red } from 'colorette'
import * as dotenv from 'dotenv'

dotenv.config()

const logger: Logger = new Logger('msBootstrap')

const RMQ_HOST: string = process.env.RMQ_HOST
const RMQ_QUEUE: string = process.env.RMQ_QUEUE

const msBootstrap = async () => {
	const app: INestMicroservice =
		await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
			transport: Transport.RMQ,
			options: {
				urls: [RMQ_HOST],
				queue: RMQ_QUEUE
			}
		})

	try {
		await app.listen()
		logger.log('Microservice is listening')
	} catch (err: unknown) {
		logger.error(red(`Something went wrong... Learn moret at: ${err}`))
	}
}

msBootstrap()
