import { Request, Response } from "express"
import { ImportBaseWmsService } from "../../services/baseWms/ImportBaseWmsService"

class ImportBaseWmsController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id
    const { date, nome } = req.body

    if (!req.file) {
      throw new Error("Erro upload arquivo")
    }

    const importBaseWmsService = new ImportBaseWmsService()

    const baseWms = await importBaseWmsService.execute({
      excelFilename: req.file,
      date,
      user_id,
      nome,
    })

    return res.json(baseWms)
  }
}

export { ImportBaseWmsController }
