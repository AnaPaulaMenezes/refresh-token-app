import { client } from "../../prisma/client";
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    username: string;
    password: string;
}
class CreateUserUseCase {
    async execute({ name, username, password }: IUserRequest) {
        const userExists = await client.user.findFirst({
            where: {
                username
            }
        });

        if (userExists) {
            throw new Error("User already exists!");
        }

        const passwordHash = await hash(password, 8);

        const user = await client.user.create({
            data: {
                name,
                username,
                password: passwordHash
            }
        });

        return user;
    }
}

export { CreateUserUseCase }