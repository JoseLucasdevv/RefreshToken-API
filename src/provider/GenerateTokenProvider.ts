import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, "e2ac90fa-2e12-4f99-8dde-7e3a7690ab35", {
      subject: userId,
      expiresIn: "20s",
    });

    return token;
  }
}

export { GenerateTokenProvider };
