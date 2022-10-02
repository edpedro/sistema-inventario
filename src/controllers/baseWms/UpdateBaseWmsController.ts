import { Request, Response } from "express"
import { UpdateBaseWmsService } from "../../services/baseWms/UpdateBaseWmsService"

class UpdateBaseWmsController {
  async handle(req: Request, res: Response) {
    const { id, balance, address, category, center, description, item, date } =
      req.body

    const updateBaseWmsService = new UpdateBaseWmsService()

    const baseWms = await updateBaseWmsService.execute({
      id,
      balance,
      address,
      category,
      center,
      description,
      item,
      date,
    })

    return res.json(baseWms)
  }
}

export { UpdateBaseWmsController }
