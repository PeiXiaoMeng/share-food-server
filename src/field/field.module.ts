import { Global, Module } from '@nestjs/common';
import { FieldService } from './field.service';
import { PrismaService } from '../common/prisma.service';
import { CacheService } from '../common/redis-cache.service';

@Global()
@Module({
  providers: [FieldService, PrismaService, CacheService],
  exports: [FieldService],
})
export class FieldModule {}
