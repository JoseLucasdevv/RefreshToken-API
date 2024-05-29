import { hash } from "bcryptjs";

import { client } from "../../prisma/client";

interface IUserRequest {
  name: string;
  username: string;
  password: string;
}

class CreateUserUseCase {
  async execute({ name, username, password }: IUserRequest) {
    const userAlreadyExist = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (userAlreadyExist) {
      throw new Error("user already exist");
    }
    const passwordHash = await hash(password, 8);

    const user = await client.user.create({
      data: {
        name,
        username,
        password: passwordHash,
      },
    });

    return user;
  }
}

export { CreateUserUseCase };
