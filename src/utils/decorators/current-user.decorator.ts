import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { Request } from 'express'
import { JwtAccessPayload } from 'src/guards-handlers/jwt/jwt.strategy'

export const CurrentUser = createParamDecorator(
	(
		key: keyof JwtAccessPayload,
		ctx: ExecutionContext
	): JwtAccessPayload | keyof JwtAccessPayload => {
		const req: Request & { user: unknown } = ctx.switchToHttp().getRequest()

		return key
			? (req.user[key] as keyof JwtAccessPayload)
			: (req.user as JwtAccessPayload)
	}
)
