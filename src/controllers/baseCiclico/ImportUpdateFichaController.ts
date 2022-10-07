import { Request, Response } from "express"
import { ImportUpdateFichaService } from "../../services/baseCiclico/ImportUpdateFichaService"

class ImportUpdateFichaController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id
    const { date, name } = req.body

    if (!req.file) {
      throw new Error("Erro upload arquivo")
    }

    const importUpdateFichaService = new ImportUpdateFichaService()

    const updateFicha = await importUpdateFichaService.execute({
      excelFilename: req.file,
      date,
      name,
      user_id,
    })

    return res.json(updateFicha)
  }
}

export { ImportUpdateFichaController }
