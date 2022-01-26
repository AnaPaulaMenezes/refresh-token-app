import { Request, Response, NextFunction, response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            message: "Token is missing"
        })
    };

    const [, token] = authToken.split(" ");
    try {
        verify(token, "f304b3f2-74c2-11ec-90d6-0242ac120003")
        return next();
    } catch (err) {
        return response.status(401).json({
            message: "Token invalid"
        });
    }
}
