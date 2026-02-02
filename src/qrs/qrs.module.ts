import { Module } from '@nestjs/common';
import { QrsService } from './qrs.service';
import { QrsController } from './qrs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qr } from './entities/qr.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Qr, User])],
  controllers: [QrsController],
  providers: [QrsService],
})
export class QrsModule {}
