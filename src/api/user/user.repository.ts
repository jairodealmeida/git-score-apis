import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUserByEmail(email: string): Promise<User> {
    return this.getUserByEmail( email );
  }
}
