import prismaClient from "../../prisma"

interface BaseSapRequest {
  id: string
  balance: string
  center?: string
  deposit?: string
  item?: string
  description?: string
  value?: string
  date?: string
}

class UpdateBaseSapService {
  async execute({
    id,
    balance,
    center,
    deposit,
    item,
    description,
    value,
    date,
  }: BaseSapRequest) {
    const baseAlreadyExists = await prismaClient.baseSap.findFirst({
      where: {
        id,
      },
    })

    if (!baseAlreadyExists) {
      throw new Error("Dados não encontrado.")
    }
    const baseSap = await prismaClient.baseSap.update({
      where: {
        id,
      },
      data: {
        balance,
        center,
        deposit,
        item,
        description,
        value,
        date,
      },
    })

    return baseSap
  }
}

export { UpdateBaseSapService }
