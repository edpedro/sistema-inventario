import { Request, Response } from "express"
import { DeleteBaseWmsService } from "../../services/baseWms/DeleteBaseWmsService"

class DeleteBaseWmsController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id
    const { item, date, name, address, center, category } = req.body

    const deleteBaseWmsService = new DeleteBaseWmsService()

    const baseWms = await deleteBaseWmsService.execute({
      item,
      date,
      name,
      address,
      center,
      category,
      user_id,
    })

    return res.json(baseWms)
  }
}

export { DeleteBaseWmsController }
