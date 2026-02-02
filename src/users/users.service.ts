import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createUser(createUserDto: CreateUserDto, file?: Express.Multer.File) {
    if (file) {
      const result = await this.cloudinaryService.uploadFile(file);
      createUserDto.photo_url = result.secure_url;
    }

    const newUser = this.userRepo.create(createUserDto);
    return await this.userRepo.save(newUser);
  }

  async findAllUsers() {
    return await this.userRepo.find();
  }

  async findOneUser(id: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }
}
