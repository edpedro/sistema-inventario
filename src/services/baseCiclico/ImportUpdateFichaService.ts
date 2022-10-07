import prismaClient from "../../prisma"

import XLSX from "xlsx"

interface FileResquest {
  excelFilename: Express.Multer.File
  date: string
  name: string
  user_id: string
}

interface OrderResquest {
  Endereço: string
  Item: string
  Descrição: string
  Saldo: string
}

class ImportUpdateFichaService {
  async execute({ excelFilename, name, date, user_id }: FileResquest) {
    const wb = XLSX.readFile(excelFilename.path)
    const ws = wb.Sheets["Sheet1"]
    const baseDate: OrderResquest[] = XLSX.utils.sheet_to_json(ws)

    const baseAlreadyExists = await prismaClient.baseFichas.findMany({
      where: {
        user_id,
        date,
        name,
      },
    })
    if (baseAlreadyExists.length <= 0) {
      throw new Error("Dados não encontrado")
    }

    const data = []

    baseAlreadyExists.map(function (wms) {
      baseDate.map(function (ficha) {
        if (wms.item === ficha.Item && wms.address === ficha.Endereço) {
          data.push({
            id: wms.id,
            balance: String(ficha.Saldo),
          })
        }
      })
    })
    const upsertManyFichas = data.map((wms) =>
      prismaClient.baseFichas.update({
        where: { id: wms.id },
        data: {
          balance: String(wms.balance),
        },
      })
    )

    Promise.all(upsertManyFichas)

    return upsertManyFichas
  }
}

export { ImportUpdateFichaService }
