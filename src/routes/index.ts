import { Router } from "express"
import multer from "multer"

import { CreateUserController } from "../controllers/user/CreateUserController"
import { AuthUserController } from "../controllers/user/AuthUserController"
import { DetailUserController } from "../controllers/user/DetailUserController"

import { ImportBaseWmsController } from "../controllers/baseWms/ImportBaseWmsController"
import { DeleteBaseWmsController } from "../controllers/baseWms/DeleteBaseWmsController"
import { ListBaseWmsController } from "../controllers/baseWms/ListBaseWmsController"
import { UpdateBaseWmsController } from "../controllers/baseWms/UpdateBaseWmsController"

import { ImportBaseSapController } from "../controllers/baseSap/ImportBaseSapController"
import { DeleteBaseSAPController } from "../controllers/baseSap/DeleteBaseSAPController"
import { ListBaseSapController } from "../controllers/baseSap/ListBaseSapController"
import { UpdateBaseSapController } from "../controllers/baseSap/UpdateBaseSapController"

import { ImportBaseCiclicoController } from "../controllers/baseCiclico/ImportBaseCiclicoController"
import { GenerateFichaController } from "../controllers/baseCiclico/GenerateFichaController"

import { isAuthenticated } from "../middlewares/isAuthenticated"

import uploadConfig from "../config/multer"

const router = Router()

const upload = multer(uploadConfig.upload("./tmp"))

router.post("/users", new CreateUserController().handle)
router.post("/session", new AuthUserController().handle)
router.get("/detail", isAuthenticated, new DetailUserController().handle)

//base WMS
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
router.get("/importwms", isAuthenticated, new ListBaseWmsController().handle)
router.put("/importwms", isAuthenticated, new UpdateBaseWmsController().handle)

//base SAP
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
router.get("/importsap", isAuthenticated, new ListBaseSapController().handle)
router.put("/importsap", isAuthenticated, new UpdateBaseSapController().handle)

//base CICLICO
router.get(
  "/ciclico",
  isAuthenticated,
  upload.single("file"),
  new ImportBaseCiclicoController().handle
)
router.post("/fichas", isAuthenticated, new GenerateFichaController().handle)

export { router }
