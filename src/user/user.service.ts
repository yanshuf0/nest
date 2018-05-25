import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findOne(user: any): Promise<User> {
    return await this.userModel.findOne({username: user.username});
  }

  async create(user: any) {
    const model = await this.userModel.create(user);
    return model;
  }
}
