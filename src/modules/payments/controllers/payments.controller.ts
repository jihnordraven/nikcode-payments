import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	Query
} from '@nestjs/common'
import { CreatePaymentDto } from '../core/dtos'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { PC } from '../commands'
import { CurrentUser } from '../../../utils/decorators/current-user.decorator'
import { Payment, Prisma } from '@prisma/client'
import { PaymentsQueryRepo } from '../repositories/payments-query-repo/payments-query.repo'
import { PQ } from '../queries'
import { FindManyPaymentsResponse } from '../core/types'
import { UpdatePaymentDto } from '../core/dtos/update-payment.dto'

@Controller('payments')
export class PaymentsController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
		private readonly paymentsQueryRepo: PaymentsQueryRepo
	) {}

	@Post('create')
	@HttpCode(HttpStatus.OK)
	public async create(
		@Body() dto: CreatePaymentDto,
		@CurrentUser('userId') userId: string
	): Promise<Payment> {
		return this.commandBus.execute(new PC.CreatePaymentCommand({ ...dto, userId }))
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	public async findOne(
		@CurrentUser('userId', ParseUUIDPipe) userId: string,
		@Param('id', ParseUUIDPipe) id: string
	): Promise<any> {
		return this.queryBus.execute(new PQ.FindOnePaymentQuery({ id, userId }))
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	public async findMany(
		@CurrentUser('userId', ParseUUIDPipe) userId: string,
		@Query('query') query: string,
		@Query('limit') limit: string,
		@Query('page') page: string,
		@Query('orderDate') orderDate: Prisma.SortOrder,
		@Query('orderAmount') orderAmount: Prisma.SortOrder
	): Promise<FindManyPaymentsResponse> {
		return this.paymentsQueryRepo.findMany({
			userId,
			query,
			page: page ? +page : 1,
			limit: limit ? +limit : 10,
			orderDate: orderDate ? orderDate : 'desc',
			orderAmount
		})
	}

	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	public async update(
		@Param('id', ParseUUIDPipe) id: string,
		@CurrentUser('userId', ParseUUIDPipe) userId: string,
		@Body() dto: UpdatePaymentDto
	): Promise<Payment> {
		return this.commandBus.execute(
			new PC.UpdatePaymentCommand({ id, userId, ...dto })
		)
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	public async delete(
		@Param('id', ParseUUIDPipe) id: string,
		@CurrentUser('userId', ParseUUIDPipe) userId: string
	) {
		return this.commandBus.execute(new PC.DeletePaymentCommand({ id, userId }))
	}
}
