import prismaClient from "../../prisma"

interface OrderResquest {
  date: string
  item?: string
  nome?: string
  endereco?: string
  estoque?: string
  categoria?: string
  user_id: string
}

class DeleteBaseWmsService {
  async execute({
    date,
    nome,
    item,
    endereco,
    estoque,
    categoria,
    user_id,
  }: OrderResquest) {
    const baseAlreadyExists = await prismaClient.baseWms.findMany({
      where: {
        date,
        nome,
        item,
        endereco,
        estoque,
        categoria,
        user_id,
      },
    })

    if (!baseAlreadyExists) {
      throw new Error("Base does not exist")
    }

    const base = await prismaClient.baseWms.deleteMany({
      where: {
        date,
        nome,
        item,
        endereco,
        estoque,
        categoria,
      },
    })
    return base
  }
}

export { DeleteBaseWmsService }
