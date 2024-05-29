import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { client } from "../../prisma/client";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

interface IRequest {
  username: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    const userAlreadyExist = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (!userAlreadyExist) {
      throw new Error("User or Password invalid");
    }

    const passwordMatch = compare(password, userAlreadyExist.password);

    if (!passwordMatch) {
      throw new Error("User or Password invalid");
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExist.id);
    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(
      userAlreadyExist.id
    );

    return { token, refreshToken };
  }
}

export { AuthenticateUserUseCase };
