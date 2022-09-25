import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface UserResquest {
  name: string;
  username: string;
  password: string
}

class CreateUserService {
  async execute({name, username, password}: UserResquest){
    if(!username){
      throw new Error("Email incorrect")
    } 

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        username
      }
    })

    if(userAlreadyExists){
      throw new Error("User already exists")
    } 

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name,
        username,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        username: true
      }
    })

    return user
  }
}

export { CreateUserService }