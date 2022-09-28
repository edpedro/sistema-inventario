import prismaClient from "../../prisma"

interface BaseWmsRequest {
  id: string
  saldo: string
  endereco?: string
  categoria?: string
  estoque?: string
  descricao?: string
  item?: string
  date?: string
}

class UpdateBaseWmsService {
  async execute({
    id,
    saldo,
    endereco,
    categoria,
    estoque,
    descricao,
    item,
    date,
  }: BaseWmsRequest) {
    const baseWms = await prismaClient.baseWms.update({
      where: {
        id,
      },
      data: {
        saldo,
        endereco,
        categoria,
        estoque,
        descricao,
        item,
        date,
      },
    })

    return baseWms
  }
}

export { UpdateBaseWmsService }
