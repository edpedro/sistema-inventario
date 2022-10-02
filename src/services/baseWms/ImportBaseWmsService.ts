import prismaClient from "../../prisma"
import XLSX from "xlsx"

interface FileResquest {
  excelFilename: Express.Multer.File
  date: string
  name: string
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
  async execute({ excelFilename, name, date, user_id }: FileResquest) {
    const wb = XLSX.readFile(excelFilename.path)
    const ws = wb.Sheets["Sheet1"]
    const baseDate: OrderResquest[] = XLSX.utils.sheet_to_json(ws)

    const baseAlreadyExists = await prismaClient.baseWms.findFirst({
      where: {
        user_id,
        date,
        name,
      },
    })
    if (baseAlreadyExists) {
      throw new Error("Dados já cadastrado")
    }

    const newBaseData = baseDate.map((value) => {
      return {
        item: String(value.Item),
        description: value.Descricao,
        address: value.Endereco,
        center: value["Tip.Estoque"],
        category: value["Cat.Item"],
        balance: String(value["Dispon.Exped."]),
        date,
        user_id,
        name,
      }
    })

    const base = prismaClient.baseWms.createMany({
      data: newBaseData,
    })

    return base
  }
}

export { ImportBaseWmsService }
