import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../common/prisma.service';
import { CacheService } from '../common/redis-cache.service';

@Global()
@Module({
  providers: [UserService, PrismaService, CacheService],
  exports: [UserService],
})
export class UserModule {}
