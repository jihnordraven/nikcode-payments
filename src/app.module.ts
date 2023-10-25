import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { redisStore } from 'cache-manager-redis-yet'
import { PrismaModule } from '../prisma/prisma.module'
import { PaymentsModule } from './modules/payments/payments.module'
import { STRATEGIES } from './guards-handlers'
import { BalancesModule } from './modules/balances/balances.module'
import { JwtGuard } from './guards-handlers/jwt/jwt.guard'
import { APP_GUARD } from '@nestjs/core'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		CacheModule.registerAsync({
			isGlobal: true,
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				store: await redisStore({
					password: config.getOrThrow<string>('REDIS_PASS'),
					socket: {
						host: config.getOrThrow<string>('REDIS_HOST'),
						port: config.getOrThrow<number>('REDIS_PORT')
					}
				})
			})
		}),
		PrismaModule,
		PaymentsModule,
		BalancesModule
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtGuard
		},
		...STRATEGIES
	]
})
export class AppModule {}
