import express, { Request, Response } from "express"
import "express-async-errors"
import cors from "cors"
import { router } from "./routes"
import path from "path"

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")))

app.use((err: Error, req: Request, res: Response) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    })
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  })
})

app.listen(3333, () => console.log("Sevidor online"))
