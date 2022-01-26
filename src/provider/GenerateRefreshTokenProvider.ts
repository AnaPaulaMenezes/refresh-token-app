import { client } from "../prisma/client"
import dayjs from "dayjs";

class GenerateRefreshTokenProvider {
    async execute(userId: string) {
        const expiresIn = dayjs().add(15, "second").unix();
        const generateRefreshToken = await client.refreshToken.create({
            data: {
                userId,
                expiresIn
            }
        });

        return generateRefreshToken;
    }
}

export { GenerateRefreshTokenProvider }