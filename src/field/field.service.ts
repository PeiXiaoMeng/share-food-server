import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CacheService } from '../common/redis-cache.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import axios from 'axios';



const APP_URL = 'https://api.weixin.qq.com/sns/jscode2session';
const ART_APP_ID = 'wx15c5442e89b289e6'; // wx15c5442e89b289e6
const ART_APP_SECRET = 'f22f370a453beaaa18e7c8532f54ecb3';

@Injectable()
export class FieldService extends PassportStrategy(Strategy) {
  constructor(
    private readonly cacheService: CacheService, 
    private readonly prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'ceshi', // TODO: Replace with your key
    });
  }

  getUser(): string {
    return '场地';
  }

  async condition() {
    const conditions: any = await this.prisma.cond.findMany();
    console.log(conditions);
    if (conditions) {
      let obj = {};
      conditions.forEach(e => {
        obj[e.id] = e.text;
      });
      return { code: 200, errmsg: '', data: obj };
    }
  }

  async field() {
    let fields: any = await this.prisma.field.findMany({
      where: {
        status: 1,
      }
    });
    // console.log(fields);
    if (fields) {
      fields = fields.map(v => {
        if (v.sign) {
          v.sign = v.sign.split(',');
        }
        return v;
      })
      console.log(fields);
      return { code: 200, errmsg: '', data: fields };
    }
  }

  async getById(id) {
    let fields: any = await this.prisma.field.findMany({
      where: {
        id,
        status: 1,
      }
    });
    console.warn('===?>>>');
    console.log(fields);
    if (fields) {
      fields = fields.map(v => {
        if (v.sign) {
          v.sign = v.sign.split(',');
        }
        return v;
      })
      console.log(fields);
      return { code: 200, errmsg: '', data: fields };
    }
  }

  async create(fieldDTO) {
    console.log('*******');
    console.log(fieldDTO);
    const { condition = [], title, desc, boundNum, isCharge, province } = fieldDTO;

    console.log(condition);

    fieldDTO.sign = condition.length ? condition.map(v => v).join(',') : '';
    console.log(fieldDTO.sign);
    return this.prisma.field.create({
      data: {
        title, desc, boundNum, isCharge, province,
        sign: fieldDTO.sign,
        status: 2,
      }
    });
  }

  async update(fieldDTO) {
    return this.prisma.field.update({
      where: {
        id: fieldDTO.id
      },
      data: {
        ...fieldDTO
      }
    });
  }
}