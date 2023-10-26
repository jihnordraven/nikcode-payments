import { Module } from '@nestjs/common'
import { PaymentsController } from './controllers/payments.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { PaymentsRepo } from './repositories/payments-repo/payments.repo'
import { PCH } from './commands'
import { BalancesModule } from '../balances/balances.module'
import { PaymentsQueryRepo } from './repositories/payments-query-repo/payments-query.repo'
import { PQH } from './queries'

@Module({
	imports: [CqrsModule, BalancesModule],
	controllers: [PaymentsController],
	providers: [PaymentsRepo, PaymentsQueryRepo, ...PCH, ...PQH],
	exports: [PaymentsRepo]
})
export class PaymentsModule {}
