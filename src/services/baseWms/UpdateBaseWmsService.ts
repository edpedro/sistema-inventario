import prismaClient from "../../prisma"

interface BaseWmsRequest {
  id: string
  balance: string
  address?: string
  category?: string
  center?: string
  description?: string
  item?: string
  date?: string
}

class UpdateBaseWmsService {
  async execute({
    id,
    balance,
    address,
    category,
    center,
    description,
    item,
    date,
  }: BaseWmsRequest) {
    const baseAlreadyExists = await prismaClient.baseWms.findFirst({
      where: {
        id,
      },
    })

    if (!baseAlreadyExists) {
      throw new Error("Dados não encontrado.")
    }

    const baseWms = await prismaClient.baseWms.update({
      where: {
        id,
      },
      data: {
        balance,
        address,
        category,
        center,
        description,
        item,
        date,
      },
    })

    return baseWms
  }
}

export { UpdateBaseWmsService }
