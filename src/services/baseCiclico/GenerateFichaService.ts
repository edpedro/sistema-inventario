import prismaClient from "../../prisma"

interface OrderResquest {
  date: string
  name: string
  user_id: string
}

class GenerateFichaService {
  async execute({ date, name, user_id }: OrderResquest) {
    return { ok: true }
  }
}

export { GenerateFichaService }
