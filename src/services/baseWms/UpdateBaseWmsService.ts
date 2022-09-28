import prismaClient from "../../prisma"

interface BaseWmsRequest {
  saldo: string
  id: string
}

class UpdateBaseWmsService {
  async execute({ id, saldo }: BaseWmsRequest) {
    const baseWms = await prismaClient.baseWms.update({
      where: {
        id,
      },
      data: {
        saldo,
      },
    })

    return baseWms
  }
}

export { UpdateBaseWmsService }
