import prismaClient from "../../prisma"

interface OrderResquest {
  date: string
  center: string
  name: string
  deposit: string
  item: string
  user_id: string
}

class DeleteBaseSapService {
  async execute({ date, center, name, deposit, item, user_id }: OrderResquest) {
    const baseAlreadyExists = await prismaClient.baseSap.findMany({
      where: {
        user_id,
        date,
        center,
        name,
        deposit,
        item,
      },
    })

    if (baseAlreadyExists.length <= 0) {
      throw new Error("Dados não encontrado.")
    }

    const base = await prismaClient.baseSap.deleteMany({
      where: {
        date,
        center,
        name,
        deposit,
        item,
      },
    })

    return base
  }
}

export { DeleteBaseSapService }
