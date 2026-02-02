import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (configService: ConfigService) => {
    const cloudinaryUrl = configService.get<string>('CLOUDINARY_URL');
    if (cloudinaryUrl) {
      process.env.CLOUDINARY_URL = cloudinaryUrl;
    }
    return cloudinary.config(true); // Passing true forces a re-read of the env
  },
  inject: [ConfigService],
};
