import { Module } from '@nestjs/common'
import { BalancesController } from './balances.controller'
import { BalancesRepo } from './repositories/balances.repo'
import { CqrsModule } from '@nestjs/cqrs'

@Module({
	imports: [CqrsModule],
	controllers: [BalancesController],
	providers: [BalancesRepo],
	exports: [BalancesRepo]
})
export class BalancesModule {}
