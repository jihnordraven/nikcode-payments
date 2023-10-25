import { Provider } from '@nestjs/common'
import { JwtGuard } from './jwt/jwt.guard'
import { JwtStrategy } from './jwt/jwt.strategy'

export const GUARDS = { JwtGuard }

export const STRATEGIES: Provider[] = [JwtStrategy]
