import prismaClient from "../../prisma"

interface OrderResquest {
  date: string
  user_id: string
}

class DeleteBaseWmsService {
  async execute({ date, user_id }: OrderResquest) {
    const baseAlreadyExists = await prismaClient.baseWms.findMany({
      where: {
        user_id,
        date,
      },
    })

    if (!baseAlreadyExists) {
      throw new Error("Base does not exist")
    }

    const base = await prismaClient.baseWms.deleteMany({
      where: {
        user_id,
        date,
      },
    })

    return base
  }
}

export { DeleteBaseWmsService }
