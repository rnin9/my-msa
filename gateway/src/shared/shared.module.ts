import { Module } from '@nestjs/common';
import { ProxyService } from './proxy/proxy.service';
import { JwtStrategy } from '@shared/strategies/jwt.strategy';
import { RolesGuard } from '@shared/guards/roles.guard';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: [ProxyService, JwtStrategy, JwtAuthGuard, RolesGuard],
  exports: [ProxyService, JwtStrategy, JwtAuthGuard, RolesGuard],
})
export class SharedModule {}
