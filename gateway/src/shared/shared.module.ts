import { Module } from '@nestjs/common';
import { ProxyService } from './proxy/proxy.service';
import { JwtStrategy } from '@shared/strategies/jwt.strategy';
import { RolesGuard } from '@shared/guards/roles.guard';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { Roles } from '@shared/decorators/roles.decorator';

@Module({
  providers: [ProxyService, JwtStrategy, RolesGuard],
  exports: [ProxyService, JwtAuthGuard, RolesGuard, Roles],
})
export class SharedModule {}
