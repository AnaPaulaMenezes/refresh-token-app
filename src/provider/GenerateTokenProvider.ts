import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
    async execute(userId: string) {
        const token = sign({}, "f304b3f2-74c2-11ec-90d6-0242ac120003", {
            subject: userId,
            expiresIn: "20s"
        });

        return token;
    }
}

export { GenerateTokenProvider };