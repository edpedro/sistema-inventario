import prismaClient from "../../prisma"
import XLSX from "xlsx"
import path from "path"

interface OrderResquest {
  date: string
  name: string
  user_id: string
}

class GenerateFichaService {
  async execute({ date, name, user_id }: OrderResquest) {
    const workSheetColumnName = ["Endereço", "Item", "Descrição", "Saldo"]
    const workSheetName = "ficha"
    const filePath = `./tmp/fichas.xlsx`

    const fichas = await prismaClient.baseFichas.findMany({
      where: {
        date,
        name,
        user_id,
      },
    })

    if (fichas.length <= 0) {
      throw new Error("Dados não encontrado")
    }

    const data = fichas.map((ficha) => {
      return [ficha.address, ficha.item, ficha.description]
    })

    const workBook = XLSX.utils.book_new()
    const workSheetData = [workSheetColumnName, ...data]
    const workSheet = XLSX.utils.aoa_to_sheet(workSheetData)
    XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName)
    XLSX.writeFile(workBook, path.resolve(filePath))

    const file = path.join(__dirname, "..", "..", "..", "/tmp", "fichas.xlsx")

    return file
  }
}

export { GenerateFichaService }
