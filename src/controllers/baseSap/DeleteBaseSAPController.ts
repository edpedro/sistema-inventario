import { Request, Response } from "express"
import { DeleteBaseSapService } from "../../services/baseSAP/DeleteBaseSapService"

class DeleteBaseSAPController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id
    const { date, centro, nome, deposito, material } = req.body

    const deleteBaseSapService = new DeleteBaseSapService()

    const baseSap = await deleteBaseSapService.execute({
      date,
      centro,
      nome,
      deposito,
      material,
      user_id,
    })

    return res.json(baseSap)
  }
}

export { DeleteBaseSAPController }
