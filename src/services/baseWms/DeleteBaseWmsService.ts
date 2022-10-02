import prismaClient from "../../prisma"

interface OrderResquest {
  date: string
  item?: string
  name?: string
  address?: string
  center?: string
  category?: string
  user_id: string
}

class DeleteBaseWmsService {
  async execute({
    date,
    name,
    item,
    address,
    center,
    category,
    user_id,
  }: OrderResquest) {
    const baseAlreadyExists = await prismaClient.baseWms.findMany({
      where: {
        date,
        name,
        item,
        address,
        center,
        category,
        user_id,
      },
    })

    if (baseAlreadyExists.length <= 0) {
      throw new Error("Dados não encontrado.")
    }

    const base = await prismaClient.baseWms.deleteMany({
      where: {
        date,
        name,
        item,
        address,
        center,
        category,
      },
    })
    return base
  }
}

export { DeleteBaseWmsService }
