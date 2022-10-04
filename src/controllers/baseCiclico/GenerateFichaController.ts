import { Request, Response } from "express"
import { GenerateFichaService } from "../../services/baseCiclico/GenerateFichaService"

class GenerateFichaController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id
    const { date, name } = req.body

    const generateFichaService = new GenerateFichaService()

    const fichas = await generateFichaService.execute({
      date,
      name,
      user_id,
    })

    return res.sendFile(fichas)
  }
}

export { GenerateFichaController }
