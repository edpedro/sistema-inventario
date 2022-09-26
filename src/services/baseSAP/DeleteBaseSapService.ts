import prismaClient from "../../prisma"

interface OrderResquest {
  date: string
  user_id: string
}

class DeleteBaseSapService {
  async execute({ date, user_id }: OrderResquest) {
    const baseAlreadyExists = await prismaClient.baseSap.findMany({
      where: {
        user_id,
        date,
      },
    })

    if (!baseAlreadyExists) {
      throw new Error("Base does not exist")
    }

    const base = await prismaClient.baseSap.deleteMany({
      where: {
        user_id,
        date,
      },
    })

    return base
  }
}

export { DeleteBaseSapService }
