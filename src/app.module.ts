import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FieldModule } from './field/field.module';
import { CacheModule } from './common/redis-cache.module';

@Module({
  imports: [UserModule, FieldModule, CacheModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
