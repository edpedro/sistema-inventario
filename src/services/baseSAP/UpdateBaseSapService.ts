import prismaClient from "../../prisma"

interface BaseSapRequest {
  saldo: string
  id: string
}

class UpdateBaseSapService {
  async execute({ id, saldo }: BaseSapRequest) {
    const baseSap = await prismaClient.baseSap.update({
      where: {
        id,
      },
      data: {
        saldo,
      },
    })

    return baseSap
  }
}

export { UpdateBaseSapService }
