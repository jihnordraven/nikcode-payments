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
import { CategoriesModule } from './modules/categories/categories.module'
import { FilesModule } from './modules/files/files.module'
import { AppController } from './app.controller'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		CacheModule.registerAsync({
			isGlobal: true,
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				store: await redisStore({
					socket: {
						host: config.getOrThrow<string>('REDIS_HOST'),
						port: config.getOrThrow<number>('REDIS_PORT')
					}
				})
			})
		}),
		PrismaModule,
		PaymentsModule,
		BalancesModule,
		CategoriesModule,
		FilesModule
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtGuard
		},
		...STRATEGIES
	]
})
export class AppModule {}
