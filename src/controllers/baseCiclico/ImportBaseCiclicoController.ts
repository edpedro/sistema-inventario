import { Request, Response } from "express"
import { ImportBaseCiclicoService } from "../../services/baseCiclico/ImportBaseCiclicoService"

class ImportBaseCiclicoController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id
    const { date, name } = req.body

    if (!req.file) {
      throw new Error("Erro upload arquivo")
    }

    const importBaseCiclicoService = new ImportBaseCiclicoService()

    const baseCiclico = await importBaseCiclicoService.execute({
      excelFilename: req.file,
      date,
      name,
      user_id,
    })

    return res.json(baseCiclico)
  }
}

export { ImportBaseCiclicoController }
