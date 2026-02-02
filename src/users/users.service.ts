import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepo.create(createUserDto);
    const user = this.userRepo.save(newUser);
    return user;
  }
  async findAllUsers() {
    const users = await this.userRepo.find();
    return users;
  }
  async findOneUser(id: string) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    const { id: userId, name, grade, specialty, dni, cip, area } = user;
    return { id: userId, name, grade, specialty, dni, cip, area };
  }
}
