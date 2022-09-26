import prismaClient from "../../prisma"

interface BaseWmsRequest {
  user_id: string
  date?: string
  item: string
}

class ListBaseWmsService {
  async execute({ user_id, date, item }: BaseWmsRequest) {
    const baseWms = await prismaClient.baseWms.findMany({
      where: {
        user_id,
        date,
        item,
      },
    })

    return baseWms
  }
}

export { ListBaseWmsService }
