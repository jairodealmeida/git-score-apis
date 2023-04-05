import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './user.interface';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<IUser> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, createUserDto: CreateUserDto): Promise<IUser> {
    return this.userModel.findByIdAndUpdate(id, createUserDto, { new: true }).exec();
  }

  async delete(id: string): Promise<IUser> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
