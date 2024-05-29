import { Router } from "express";
import { CreateUserController } from "./useCases/CreateUser/CreateUserController";

import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/RefreshTokenUserController";

const router = Router();

const createUserController: CreateUserController = new CreateUserController();

const authenticateUserController: AuthenticateUserController =
  new AuthenticateUserController();

const refreshTokenUserController = new RefreshTokenUserController();

router.post("/users", createUserController.handle);

router.post("/login", authenticateUserController.handle);

router.post("/refresh_token", refreshTokenUserController.handle);

router.get("/courses", ensureAuthenticated, (request, response) => {
  return response.json([
    {
      id: 1,
      name: "NODEJS",
    },
    {
      id: 2,
      name: "ANGULAR",
    },
    {
      id: 3,
      name: "JAVA",
    },
    {
      id: 4,
      name: "REACT",
    },
  ]);
});

export { router };
