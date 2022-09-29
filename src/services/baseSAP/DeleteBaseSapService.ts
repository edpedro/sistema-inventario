import prismaClient from "../../prisma"

interface OrderResquest {
  date: string
  centro: string
  nome: string
  deposito: string
  material: string
  user_id: string
}

class DeleteBaseSapService {
  async execute({
    date,
    user_id,
    centro,
    nome,
    deposito,
    material,
  }: OrderResquest) {
    const baseAlreadyExists = await prismaClient.baseSap.findMany({
      where: {
        user_id,
        date,
        centro,
        nome,
        deposito,
        material,
      },
    })

    if (!baseAlreadyExists) {
      throw new Error("Base does not exist")
    }

    const base = await prismaClient.baseSap.deleteMany({
      where: {
        date,
        centro,
        nome,
        deposito,
        material,
      },
    })

    return base
  }
}

export { DeleteBaseSapService }
