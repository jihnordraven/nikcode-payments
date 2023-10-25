import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { BalancesRepo } from './repositories/balances.repo'

@Controller('balances')
export class BalancesController {
	constructor(private readonly balancesRepo: BalancesRepo) {}

	@MessagePattern('userCreated')
	public async create(@Payload() userId: string): Promise<any> {
		return this.balancesRepo.create({ userId })
	}
}
