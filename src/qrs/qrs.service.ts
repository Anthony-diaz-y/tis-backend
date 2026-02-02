import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQrDto } from './dto/create-qr.dto';
import { Repository } from 'typeorm';
import { Qr } from './entities/qr.entity';
import * as QRCode from 'qrcode';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QrsService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Qr)
    private readonly qrRepo: Repository<Qr>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createQr(createQrDto: CreateQrDto): Promise<Qr> {
    const { userId } = createQrDto;
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException(`User with ID: ${userId} not found`);

    const appUrl = this.configService.get<string>('APP_URL');
    if (!appUrl) throw new Error('APP_URL is not defined in environment');
    const url = `${appUrl}/user/${user.id}`;

    const code_qr = await QRCode.toDataURL(url);

    const qr = this.qrRepo.create({ code_qr, user });
    return this.qrRepo.save(qr);
  }

  // async findOneQr(id: string) {
  //   const qr = await this.qrRepo.findOne({
  //     where: { id },
  //     relations: ['user'],
  //   });

  //   if (!qr) throw new NotFoundException(`QR with ID ${id} not found`)

  //   const { name, last_name, grade } = qr.user

  //   return {
  //     name, last_name, grade
  //   }
  // }

  // findAll() {
  //   return `This action returns all qrs`;
  // }
}
