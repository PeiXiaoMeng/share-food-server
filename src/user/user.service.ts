import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CacheService } from '../common/redis-cache.service';
import axios from 'axios';


const crypto = require('crypto');

const APP_URL = 'https://api.weixin.qq.com/sns/jscode2session';
const ART_APP_ID = 'wx15c5442e89b289e6'; // wx15c5442e89b289e6
const ART_APP_SECRET = 'f22f370a453beaaa18e7c8532f54ecb3';

@Injectable()
export class UserService {
  constructor(
    private readonly cacheService: CacheService, 
    private readonly prisma: PrismaService
  ) {}

  getUser(): string {
    return '用户';
  }

  async registry(userdto) {
    const js_code = userdto.code;
    const url = `${APP_URL}?appid=${ART_APP_ID}&secret=${ART_APP_SECRET}&js_code=${js_code}&grant_type=authorization_code`;

    const res = await axios.get(url);
    const openId = res?.data?.openid;
    const sessionKey = res?.data?.session_key;
    this.cacheService.set('sessionKey', sessionKey);

    if (openId) {
      const user: any = await this.prisma.user.findMany({ where: { openId } });
      if (user && user.length) {
        const token = btoa(encodeURIComponent(openId));
        return { code: 200, errmsg: '', data: {
          token: token,
          avatarUrl: user[0].avatarUrl,
          nickName: user[0].nickName,
        }};
      }

      const result = await this.prisma.user.create({
        data: {
          openId,
          nickName: '',
          avatarUrl: '',
        },
      });
      const token = btoa(encodeURIComponent(openId));
      return { code: 200, errmsg: '', data: {
        token: token,
        avatarUrl: result.avatarUrl,
        nickName: result.nickName,
      }};
    }
  }

  /**
   * 解析微信登录用户数据
   * @param sessionKey
   * @param encryptedData
   * @param iv
   * @returns {Promise.<string>}
   */
  async decryptUserInfoData(sessionKey, encryptedData, iv) {
    let decoded = '';
    try {
      const _sessionKey = Buffer.from(sessionKey, 'base64');
      encryptedData = Buffer.from(encryptedData, 'base64');
      iv = Buffer.from(iv, 'base64');
      // 解密
      const decipher = crypto.createDecipheriv('aes-128-cbc', _sessionKey, iv);
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      decoded = decipher.update(encryptedData, 'binary', 'utf8');
      decoded += decipher.final('utf8');
      const userInfo = JSON.parse(decoded);


      if (userInfo.watermark.appid !== ART_APP_ID) {
        return { code: 400, errmsg: 'watermark appid 错误', data: null };
      }

      return { code: 200, errmsg: '', data: userInfo };
    } catch (err) {
      return { code: 500, errmsg: '解析用户数据错误：' + err.message, data: null };
    }
  }

  async login(userdto) {
    const { encryptedData, iv, code } = userdto;
    const js_code = code;
    const url = `${APP_URL}?appid=${ART_APP_ID}&secret=${ART_APP_SECRET}&js_code=${js_code}&grant_type=authorization_code`;

    const result = await axios.get(url);
    // const res = await this.cacheService.get('sessionKey');
    const res = result.data.session_key;

    const user = await this.decryptUserInfoData(res, encryptedData, iv);
    if (user && user.code === 200) {

      const userMsg = await this.prisma.user.findMany({ where: { openId: user.data.openId } });
      if (userMsg && userMsg.length) { // 包含user信息
        await this.prisma.user.update({
          where: { openId: user.data.openId  },
          data: {
            nickName: user.data.nickName,
            avatarUrl: user.data.avatarUrl,
          },
        });
        const token = btoa(encodeURIComponent(user.data.openId));
        return { code: 200, errmsg: '', data: {
          token,
          nickName: user.data.nickName,
          avatarUrl: user.data.avatarUrl,
        } };
      }

      await this.prisma.user.create({
        data: {
          openId: user.data.openId,
          nickName: user.data.nickName,
          avatarUrl: user.data.avatarUrl,
        },
      });
      const token = btoa(encodeURIComponent(user.data.openId));
      return { code: 200, errmsg: '', data: {
        token,
        nickName: user.data.nickName,
        avatarUrl: user.data.avatarUrl,
      } };
    }
    return user;
  }
}
