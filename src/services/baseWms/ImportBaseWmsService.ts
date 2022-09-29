import prismaClient from "../../prisma"
import XLSX from "xlsx"

interface FileResquest {
  excelFilename: Express.Multer.File
  date: string
  nome: string
  user_id: string
}

interface OrderResquest {
  Item: string
  Descricao: string
  Endereco: string
  "Tip.Estoque": string
  "Cat.Item": string
  "Dispon.Exped.": string
}

class ImportBaseWmsService {
  async execute({ excelFilename, nome, date, user_id }: FileResquest) {
    const wb = XLSX.readFile(excelFilename.path)
    const ws = wb.Sheets["Sheet1"]
    const baseDate: OrderResquest[] = XLSX.utils.sheet_to_json(ws)

    const baseAlreadyExists = await prismaClient.baseWms.findFirst({
      where: {
        user_id,
        date,
        nome,
      },
    })
    if (baseAlreadyExists) {
      throw new Error("Base already exists")
    }

    const newBaseData = baseDate.map((value) => {
      return {
        item: String(value.Item),
        descricao: value.Descricao,
        endereco: value.Endereco,
        estoque: value["Tip.Estoque"],
        categoria: value["Cat.Item"],
        saldo: String(value["Dispon.Exped."]),
        date,
        user_id,
        nome,
      }
    })

    const base = prismaClient.baseWms.createMany({
      data: newBaseData,
    })

    return base
  }
}

export { ImportBaseWmsService }
