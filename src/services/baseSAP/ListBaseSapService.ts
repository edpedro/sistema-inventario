import prismaClient from "../../prisma"

interface BaseSapRequest {
  user_id: string
  date?: string
  item: string
}

class ListBaseSapService {
  async execute({ user_id, date, item }: BaseSapRequest) {
    const baseSap = await prismaClient.baseSap.findMany({
      where: {
        user_id,
        date,
        item,
      },
    })

    return baseSap
  }
}

export { ListBaseSapService }
