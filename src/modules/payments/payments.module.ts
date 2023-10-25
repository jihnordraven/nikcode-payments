import { Module } from '@nestjs/common'
import { PaymentsController } from './controllers/payments.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { PaymentsRepo } from './repositories/payments.repo'
import { PCH } from './commands'
import { BalancesModule } from '../balances/balances.module'

@Module({
	imports: [CqrsModule, BalancesModule],
	controllers: [PaymentsController],
	providers: [PaymentsRepo, ...PCH],
	exports: [PaymentsRepo]
})
export class PaymentsModule {}
