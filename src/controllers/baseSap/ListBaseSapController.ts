import { Request, Response } from "express"
import { ListBaseSapService } from "../../services/baseSAP/ListBaseSapService"

class ListBaseSapController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id
    const { date, material } = req.body

    const listBaseSapService = new ListBaseSapService()

    const baseSap = await listBaseSapService.execute({
      user_id,
      date,
      material,
    })

    return res.json(baseSap)
  }
}

export { ListBaseSapController }
