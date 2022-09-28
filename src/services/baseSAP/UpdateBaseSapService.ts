import prismaClient from "../../prisma"

interface BaseSapRequest {
  id: string
  saldo: string
  centro?: string
  deposito?: string
  material?: string
  descricao?: string
  valor?: string
  date?: string
}

class UpdateBaseSapService {
  async execute({
    id,
    saldo,
    centro,
    deposito,
    material,
    descricao,
    valor,
    date,
  }: BaseSapRequest) {
    const baseSap = await prismaClient.baseSap.update({
      where: {
        id,
      },
      data: {
        saldo,
        centro,
        deposito,
        material,
        descricao,
        valor,
        date,
      },
    })

    return baseSap
  }
}

export { UpdateBaseSapService }
