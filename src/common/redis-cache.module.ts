import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis'
import {CacheService} from './redis-cache.service';

const options: any = {
  port: 6379,
  host: 'localhost', // 远程调试需要设置bindip 为0.0.0.0 并且设置密码
  password: '',  // 非远程不需要密码
  decode_responses:true,
  db: 3
}
@Module({
    imports: [
        RedisModule.register(options),
    ],

    //!!!!!!!外部模块需要使用必须先导出，外部模块引入
    // 将 CacheService 引入改模块
    providers: [CacheService],
    // 再将 CacheService 暴露出去
    exports: [CacheService]

  })
export class CacheModule {}