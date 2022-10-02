import { Request, Response } from "express"
import { ImportBaseWmsService } from "../../services/baseWms/ImportBaseWmsService"

class ImportBaseWmsController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id
    const { date, name } = req.body

    if (!req.file) {
      throw new Error("Erro upload arquivo")
    }

    const importBaseWmsService = new ImportBaseWmsService()

    const baseWms = await importBaseWmsService.execute({
      excelFilename: req.file,
      date,
      user_id,
      name,
    })

    return res.json(baseWms)
  }
}

export { ImportBaseWmsController }
