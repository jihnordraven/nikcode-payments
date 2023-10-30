import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { BalancesRepo } from '../repositories/balances.repo'
import { Balance } from '@prisma/client'
import { Public } from '../../../utils/decorators/public.decorator'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Balances patterns')
@Public()
@Controller('balances')
export class BalancesController {
	constructor(private readonly balancesRepo: BalancesRepo) {}

	@MessagePattern('user-created')
	public async createByUserId(
		@Payload() userId: string
	): Promise<{ ok: boolean; err?: string }> {
		return this.balancesRepo.create(userId)
	}

	@MessagePattern('user-deleted')
	public async deleteByUserId(@Payload() userId: string): Promise<Balance> {
		return this.balancesRepo.deleteByUserId(userId)
	}
}
