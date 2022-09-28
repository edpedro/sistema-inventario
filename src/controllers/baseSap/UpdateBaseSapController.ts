import { Request, Response } from "express"
import { UpdateBaseSapService } from "../../services/baseSAP/UpdateBaseSapService"

class UpdateBaseSapController {
  async handle(req: Request, res: Response) {
    const { id, saldo } = req.body

    const updateBaseSapService = new UpdateBaseSapService()

    const baseSap = await updateBaseSapService.execute({
      id,
      saldo,
    })

    return res.json(baseSap)
  }
}

export { UpdateBaseSapController }
