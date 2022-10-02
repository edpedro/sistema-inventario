import prismaClient from "../../prisma"
import XLSX from "xlsx"

interface FileResquest {
  excelFilename: Express.Multer.File
  date: string
  name: string
  user_id: string
}

interface OrderResquest {
  Centro: string
  Material: string
  Depósito: string
  "Texto breve material": string
  "Utilização livre": string
  "Val.utiliz.livre": string
}

class ImportBaseSapService {
  async execute({ excelFilename, date, name, user_id }: FileResquest) {
    const wb = XLSX.readFile(excelFilename.path)
    const ws = wb.Sheets["Sheet1"]
    const baseData: Array<OrderResquest> = XLSX.utils.sheet_to_json(ws)

    const baseAlreadyExists = await prismaClient.baseSap.findFirst({
      where: {
        user_id,
        date,
        name,
      },
    })
    if (baseAlreadyExists) {
      throw new Error("Dados já cadastrado")
    }

    const newBaseData = baseData.map((value) => {
      return {
        center: String(value.Centro),
        deposit: value.Depósito,
        item: value.Material,
        description: value["Texto breve material"],
        balance: String(value["Utilização livre"]),
        value: String(value["Val.utiliz.livre"]),
        date,
        name,
        user_id,
      }
    })

    const base = prismaClient.baseSap.createMany({
      data: newBaseData,
    })

    return base
  }
}

export { ImportBaseSapService }
