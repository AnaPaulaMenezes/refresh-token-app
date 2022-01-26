import { client } from "../../prisma/client";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken"
import { GenerateRefreshTokenProvider } from "../../provider/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

interface IRequest {
    username: string;
    password: string;
}

class AuthenticateUserUseCase {
    async execute({ username, password }: IRequest) {
        const userExists = await client.user.findFirst({
            where: {
                username
            }
        });

        if (!userExists) {
            throw new Error("User/password incorrect!");
        }

        const passwordMatch = await compare(password, userExists.password);

        if (!passwordMatch) {
            throw new Error("User/password incorrect!");
        }

        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(userExists.id);

        await client.refreshToken.deleteMany({
            where: {
                userId: userExists.id
            }
        })

        const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
        const refreshToken = await generateRefreshTokenProvider.execute(userExists.id);
        return { token, refreshToken };
    }
}

export { AuthenticateUserUseCase }