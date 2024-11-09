import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async getUsers() {
        const user: any = await this.userRepository.find();
        return user.map(({password, isAdmin, ...rest}) => rest);
        //devuelve un mapeo sin el password y si es admin( todavia no implementamos roles )
    }

    async getUsersById(user_id) {
        const user = await this.userRepository.findOneBy({ user_id });
        return user;
    }

    async createUser(user) {
        const newUser = await this.userRepository.save(user);
     
        const dbUser: any = await this.userRepository.findOneBy({ user_id: newUser.user_id });
      
        const { password,isAdmin, ...userNoPassword } = dbUser;
    
        return userNoPassword;
      }

    async deleteUser(user_id: string) {
        const user = await this.userRepository.delete({ user_id });
        return user;
    }

    async changePassword(user_id: string, password: string) {
        return "change password"
    }

    async changeEmail(id: string, email: string) {
       return "change email"
    }

    async changeName(id: string, name: string) {
        return "change name"
    }
}
