import prismaClient from "../../prisma"
import XLSX from "xlsx"

interface FileResquest {
  excelFilename: Express.Multer.File
  date: string
  nome: string
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
  async execute({ excelFilename, date, nome, user_id }: FileResquest) {
    const wb = XLSX.readFile(excelFilename.path)
    const ws = wb.Sheets["Sheet1"]
    const baseData: Array<OrderResquest> = XLSX.utils.sheet_to_json(ws)

    const baseAlreadyExists = await prismaClient.baseSap.findFirst({
      where: {
        user_id,
        date,
        nome,
      },
    })
    if (baseAlreadyExists) {
      throw new Error("Base already exists")
    }

    const newBaseData = baseData.map((value) => {
      return {
        centro: String(value.Centro),
        deposito: value.Depósito,
        material: value.Material,
        descricao: value["Texto breve material"],
        saldo: String(value["Utilização livre"]),
        valor: String(value["Val.utiliz.livre"]),
        date,
        nome,
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
