import { Request, Response } from "express"
import { DeleteBaseWmsService } from "../../services/baseWms/DeleteBaseWmsService"

class DeleteBaseWmsController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id
    const { item, date, nome, endereco, estoque, categoria } = req.body

    const deleteBaseWmsService = new DeleteBaseWmsService()

    const baseWms = await deleteBaseWmsService.execute({
      item,
      date,
      nome,
      endereco,
      estoque,
      categoria,
      user_id,
    })

    return res.json(baseWms)
  }
}

export { DeleteBaseWmsController }
