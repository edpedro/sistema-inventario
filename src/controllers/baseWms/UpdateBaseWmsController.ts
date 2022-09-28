import { Request, Response } from "express"
import { UpdateBaseWmsService } from "../../services/baseWms/UpdateBaseWmsService"

class UpdateBaseWmsController {
  async handle(req: Request, res: Response) {
    const { id, saldo, endereco, categoria, estoque, descricao, item, date } =
      req.body

    const updateBaseWmsService = new UpdateBaseWmsService()

    const baseWms = await updateBaseWmsService.execute({
      id,
      saldo,
      endereco,
      categoria,
      estoque,
      descricao,
      item,
      date,
    })

    return res.json(baseWms)
  }
}

export { UpdateBaseWmsController }
