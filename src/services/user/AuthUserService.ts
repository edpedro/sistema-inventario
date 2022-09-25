import prismaClient from "../../prisma"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface AuthResquest {
  username: string
  password: string
}

class AuthUserService {
  async execute({ username, password }: AuthResquest) {
    const user = await prismaClient.user.findFirst({
      where: {
        username,
      },
    })

    if (!user) {
      throw new Error("User/password incorrect")
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error("User/password incorrect")
    }

    const token = sign(
      {
        name: user.name,
        email: user.username,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    )

    return {
      id: user.id,
      name: user.name,
      email: user.username,
      token: token,
    }
  }
}

export { AuthUserService }
