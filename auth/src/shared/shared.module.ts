import { Module } from '@nestjs/common';
import { InternalService } from '@shared/internal/internal.service';
import { InternalGuard } from '@shared/internal/guards/internal.guard';

@Module({
  providers: [InternalService, InternalGuard],
  exports: [InternalService, InternalGuard],
})
export class SharedModule {}
