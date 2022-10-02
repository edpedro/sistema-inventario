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
}
interface TypeBaseWms {
  item: string
  name: string
  des: string
  description: string
  center: string
  category: string
  balance: string
}

class ImportBaseCiclicoService {
  async execute({ excelFilename, name, date, user_id }: FileResquest) {
    const wb = XLSX.readFile(excelFilename.path)
    const ws = wb.Sheets["Sheet1"]
    const baseDate: OrderResquest[] = XLSX.utils.sheet_to_json(ws)

    const baseAlreadyExists = await prismaClient.baseCiclico.findFirst({
      where: {
        user_id,
        date,
        name,
      },
    })
    if (baseAlreadyExists) {
      throw new Error("Dados já cadastrado")
    }

    const item = baseDate.map((request) => request.Item)

    const baseWmsAlreadyExists = await prismaClient.baseWms.findMany({
      where: {
        date,
        item: { in: item },
      },
    })

    const baseSapAlreadyExists = await prismaClient.baseSap.findMany({
      where: {
        date,
        item: { in: item },
      },
    })

    //soma quantidade na base WMS
    const baseWms: TypeBaseWms[] = Object.values(
      baseWmsAlreadyExists.reduce((acc, wms) => {
        acc[wms.item] = acc[wms.item]
          ? {
              ...wms,
              saldo: Number(wms.balance) + Number(acc[wms.item].balance),
            }
          : wms
        return acc
      }, {})
    )

    const base = []

    baseSapAlreadyExists.map(function (sap) {
      baseWms.map(function (wms) {
        if (sap.item === wms.item) {
          base.push({
            item: sap.item,
            description: sap.description,
            deposit: sap.deposit,
            center: sap.center,
            balanceSap: String(sap.balance),
            balanceWms: String(wms.balance),
            date,
            name,
            value: String(sap.value),
            user_id,
          })
        }
      })
    })

    const newDate = prismaClient.baseCiclico.createMany({
      data: base,
    })
    return newDate
  }
}

export { ImportBaseCiclicoService }
