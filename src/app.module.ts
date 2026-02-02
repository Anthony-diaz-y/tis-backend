import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { QrsModule } from './qrs/qrs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Qr } from './qrs/entities/qr.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Qr],
      synchronize: process.env.STATE !== 'prod',
      ssl: process.env.STATE === 'prod' ? { rejectUnauthorized: true } : false,
    }),
    UsersModule,
    QrsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
