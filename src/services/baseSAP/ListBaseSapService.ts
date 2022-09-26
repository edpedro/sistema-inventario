import prismaClient from "../../prisma"

interface BaseSapRequest {
  user_id: string
  date?: string
  material: string
}

class ListBaseSapService {
  async execute({ user_id, date, material }: BaseSapRequest) {
    const baseSap = await prismaClient.baseSap.findMany({
      where: {
        user_id,
        date,
        material,
      },
    })

    return baseSap
  }
}

export { ListBaseSapService }
