import { Request, Response } from "express"
import { ListBaseWmsService } from "../../services/baseWms/ListBaseWmsService"

class ListBaseWmsController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id
    const { date, item } = req.body

    const listBaseWmsService = new ListBaseWmsService()

    const baseWms = await listBaseWmsService.execute({
      user_id,
      date,
      item,
    })

    return res.json(baseWms)
  }
}

export { ListBaseWmsController }
