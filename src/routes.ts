import { Router } from "express";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./useCases/autheticateUserUseCase/AuthenticateUserController";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { RefreshTokenUserController } from "./useCases/refreshTokenUsers/RefreshTokenUserController";

const router = Router();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/refresh-token", refreshTokenUserController.handle);
router.get("/courses", ensureAuthenticated, (request, response) => {
    return response.json([
        { id: 1, name: "Nodejs" },
        { id: 2, name: "C#" },
        { id: 3, name: "Java" },
        { id: 4, name: "SQL" },
    ]);
});

export { router }