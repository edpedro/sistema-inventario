import { Request, Response } from "express"
import { ImportBaseSapService } from "../../services/baseSAP/ImportBaseSapService"

class ImportBaseSapController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id
    const { date, name } = req.body

    if (!req.file) {
      throw new Error("Erro upload arquivo")
    }

    const importBaseSapService = new ImportBaseSapService()

    const baseSap = await importBaseSapService.execute({
      excelFilename: req.file,
      date,
      name,
      user_id,
    })

    return res.json(baseSap)
  }
}

export { ImportBaseSapController }
