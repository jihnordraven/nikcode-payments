import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'
import { INestMicroservice, Logger } from '@nestjs/common'
import { red } from 'colorette'

const logger: Logger = new Logger('msBootstrap')

const msBootstrap = async () => {
	const app: INestMicroservice =
		await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
			transport: Transport.RMQ,
			options: {
				urls: ['amqp://admin:admin@localhost:5672'],
				queue: 'main',
				queueOptions: {
					durable: true
				}
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
