import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { FieldController } from './field/field.controller'
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FieldModule } from './field/field.module';
import { CacheModule } from './common/redis-cache.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'ceshi',
      signOptions: { expiresIn: '1d' }, // 这是可选的
    }),
    UserModule, FieldModule, CacheModule
  ],
  controllers: [AppController, UserController, FieldController],
  providers: [AppService],
})
export class AppModule {}
