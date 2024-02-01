import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../common/prisma.service';
import { CacheService } from '../common/redis-cache.service';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'ceshi',
      signOptions: { expiresIn: '1d' }, // 这是可选的
    }),
    UserModule
  ],
  providers: [UserService, PrismaService, CacheService, JwtService],
  exports: [UserService],
})
export class UserModule {}
