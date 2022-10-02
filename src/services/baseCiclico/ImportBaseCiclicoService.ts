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
}
interface TypeBaseWms {
  item: string
  nome: string
  descricao: string
  endereco: string
  estoque: string
  categoria: string
  saldo: string
}

class ImportBaseCiclicoService {
  async execute({ excelFilename, nome, date, user_id }: FileResquest) {
    const wb = XLSX.readFile(excelFilename.path)
    const ws = wb.Sheets["Sheet1"]
    const baseDate: OrderResquest[] = XLSX.utils.sheet_to_json(ws)

    const baseAlreadyExists = await prismaClient.baseCiclico.findFirst({
      where: {
        user_id,
        date,
        nome,
      },
    })
    if (baseAlreadyExists) {
      throw new Error("Base already exists")
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
        material: { in: item },
      },
    })

    //soma quantidade na base WMS
    const baseWms: TypeBaseWms[] = Object.values(
      baseWmsAlreadyExists.reduce((acc, wms) => {
        acc[wms.item] = acc[wms.item]
          ? {
              ...wms,
              saldo: Number(wms.saldo) + Number(acc[wms.item].saldo),
            }
          : wms
        return acc
      }, {})
    )

    const base = []

    baseSapAlreadyExists.map(function (sap) {
      baseWms.map(function (wms) {
        if (sap.material === wms.item) {
          base.push({
            item: sap.material,
            descricao: sap.descricao,
            deposito: sap.deposito,
            centro: sap.centro,
            saldoSap: String(sap.saldo),
            saldoWms: String(wms.saldo),
            date,
            nome,
            valor: String(sap.valor),
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
