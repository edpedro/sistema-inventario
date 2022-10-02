import { Request, Response } from "express"
import { UpdateBaseSapService } from "../../services/baseSAP/UpdateBaseSapService"

class UpdateBaseSapController {
  async handle(req: Request, res: Response) {
    const { id, balance, center, deposit, item, description, value, date } =
      req.body

    const updateBaseSapService = new UpdateBaseSapService()

    const baseSap = await updateBaseSapService.execute({
      id,
      balance,
      center,
      deposit,
      item,
      description,
      value,
      date,
    })

    return res.json(baseSap)
  }
}

export { UpdateBaseSapController }
