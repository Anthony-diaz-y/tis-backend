import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (configService: ConfigService) => {
    return cloudinary.config({
      cloudinary_url: configService.get<string>('CLOUDINARY_URL'),
    });
  },
  inject: [ConfigService],
};
