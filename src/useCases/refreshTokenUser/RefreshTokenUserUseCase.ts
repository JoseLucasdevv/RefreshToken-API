import { client } from "../../prisma/client";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

class RefreshTokenUserUseCase {
  async execute(refresh_Token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_Token,
      },
    });

    if (!refreshToken) {
      throw new Error("refresh token invalid");
    }

    const generateTokenProvider = new GenerateTokenProvider();

    const token = generateTokenProvider.execute(refreshToken.userId);

    return { token };
  }
}

export { RefreshTokenUserUseCase };
