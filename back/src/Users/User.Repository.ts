import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./User.Entity";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async getUsers() {
        const user = await this.userRepository.find();
        return user.map(({password, isAdmin, ...rest}) => rest);
        //devuelve un mapeo sin el password y si es admin( todavia no implementamos roles )
    }

    async getUsersById(id: string) {
        const user = await this.userRepository.findOneBy({ id });
        return user;
    }

    async createUser(user: Partial<UserEntity>): Promise<Partial<UserEntity>> {
        const newUser = await this.userRepository.save(user);
        // crea un nuevo usuario
        const dbUser = await this.userRepository.findOneBy({ id: newUser.id });
        // busca el usuario en la base de datos
        const { password,isAdmin, ...userNoPassword } = dbUser;
        // devuelve el usuario sin el password
        return userNoPassword;
      }

    async deleteUser(id: string) {
        const user = await this.userRepository.delete({ id });
        return user;
    }

    async changePassword(id: string, password: string) {
        const user = await this.userRepository.update({ id }, { password });
        return user;
    }

    async changeEmail(id: string, email: string) {
        const user = await this.userRepository.update({ id }, { email });
        return user;
    }

    async changeName(id: string, name: string) {
        const user = await this.userRepository.update({ id }, { name });
        return user;
    }
}

// advertencia hasta que no conectemos la base de datos no podremos realizar nignuna prueba con insomina a no ser que creemos
// un usuario en la base de datos fake para poder hacer las pruebas con un repo con datos 