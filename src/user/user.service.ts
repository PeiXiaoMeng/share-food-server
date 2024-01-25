import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  getUser(): string {
    return '用户';
  }

  async registry(userdto) {
    const js_code = userdto.code;
    const APP_URL = 'https://api.weixin.qq.com/sns/jscode2session';
    const ART_APP_ID = 'wx15c5442e89b289e6'; // wx15c5442e89b289e6
    const ART_APP_SECRET = 'f22f370a453beaaa18e7c8532f54ecb3';

    const url = `${APP_URL}?appid=${ART_APP_ID}&secret=${ART_APP_SECRET}&js_code=${js_code}&grant_type=authorization_code`;

    const res = await axios.get(url);
    const openId = res?.data?.openid;

    if (openId) {
      const user = await this.prisma.user.findMany({ where: { openId } });
      if (user && user.length) {
        return user[0];
      }

      const result = await this.prisma.user.create({
        data: {
          openId,
        },
      });
      return result;
    }
  }
}
