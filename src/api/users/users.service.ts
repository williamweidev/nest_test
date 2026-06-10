import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, username } = createUserDto;

    const exist = await this.findUserByEmailOrUsername(email, username);
    if (exist) {
      throw new BadRequestException(
        'UserEntity with the email or username already exists',
      );
    }

    const new_user = new UserEntity();
    new_user.email = email.trim();
    new_user.username = username.toLowerCase().trim();
    return this.userRepository.save(new_user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    if (users.length === 0) {
      console.log('No users found.');
    }

    return users;
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findUserByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<UserEntity | null> {
    const exist = await this.userRepository.findOne({
      where: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    });
    if (exist) return exist;
    return null;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const { email, username } = updateUserDto;
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository
      .update(id, {
        email: email,
        username: username,
      })
      .catch((err) => {
        throw new InternalServerErrorException(
          `[${err.message}] for User ID [${id}]`,
        );
      });

    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.remove(user);
    return true;
  }
}
