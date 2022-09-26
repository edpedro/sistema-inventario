import { Router } from "express"
import multer from "multer"

import { CreateUserController } from "../controllers/user/CreateUserController"
import { AuthUserController } from "../controllers/user/AuthUserController"
import { DetailUserController } from "../controllers/user/DetailUserController"

import { ImportBaseWmsController } from "../controllers/baseWms/ImportBaseWmsController"
import { DeleteBaseWmsController } from "../controllers/baseWms/DeleteBaseWmsController"

import { ImportBaseSapController } from "../controllers/baseSap/ImportBaseSapController"
import { DeleteBaseSAPController } from "../controllers/baseSap/DeleteBaseSAPController"

import { isAuthenticated } from "../middlewares/isAuthenticated"

import uploadConfig from "../config/multer"

const router = Router()

const upload = multer(uploadConfig.upload("./tmp"))

router.post("/users", new CreateUserController().handle)
router.post("/session", new AuthUserController().handle)
router.get("/detail", isAuthenticated, new DetailUserController().handle)

router.post(
  "/importwms",
  isAuthenticated,
  upload.single("file"),
  new ImportBaseWmsController().handle
)
router.delete(
  "/importwms",
  isAuthenticated,
  new DeleteBaseWmsController().handle
)

router.post(
  "/importsap",
  isAuthenticated,
  upload.single("file"),
  new ImportBaseSapController().handle
)
router.delete(
  "/importsap",
  isAuthenticated,
  new DeleteBaseSAPController().handle
)

export { router }
