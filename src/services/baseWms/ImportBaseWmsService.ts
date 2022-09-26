import prismaClient from "../../prisma"
import XLSX from "xlsx"

interface FileResquest {
  excelFilename: Express.Multer.File
  date: string
  user_id: string
}

interface OrderResquest {
  Item: string
  Descricao: string
  Endereco: string
  Estoque: string
  Categoria: string
  Saldo: number
}

class ImportBaseWmsService {
  async execute({ excelFilename, date, user_id }: FileResquest) {
    const wb = XLSX.readFile(excelFilename.path)
    const ws = wb.Sheets["Sheet1"]
    const baseData: Array<OrderResquest> = XLSX.utils.sheet_to_json(ws)

    const baseAlreadyExists = await prismaClient.baseWms.findFirst({
      where: {
        user_id,
        date,
      },
    })
    if (baseAlreadyExists) {
      throw new Error("Base already exists")
    }

    const base = baseData.map((baseData) =>
      prismaClient.baseWms.createMany({
        data: {
          item: String(baseData.Item),
          descricao: baseData.Descricao,
          endereco: baseData.Endereco,
          estoque: baseData.Estoque,
          categoria: baseData.Categoria,
          saldo: baseData.Saldo,
          date,
          user_id,
        },
      })
    )
    Promise.all(base)

    return { ok: true }
  }
}

export { ImportBaseWmsService }
