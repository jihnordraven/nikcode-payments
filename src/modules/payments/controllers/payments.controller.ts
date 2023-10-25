import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { CreatePaymentDto } from '../core/dtos'
import { CommandBus } from '@nestjs/cqrs'
import { PC } from '../commands'
import { CurrentUser } from '../../../utils/decorators/current-user.decorator'

@Controller('payments')
export class PaymentsController {
	constructor(private readonly commandBus: CommandBus) {}

	@Post('create')
	@HttpCode(HttpStatus.OK)
	public async create(
		@Body() dto: CreatePaymentDto,
		@CurrentUser('userId') userId: string
	): Promise<any> {
		return this.commandBus.execute(new PC.CreatePaymentCommand({ ...dto, userId }))
	}
}
