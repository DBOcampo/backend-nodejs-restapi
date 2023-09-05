import { Router } from 'express'
import { GetTest, PostTest, PutTest, DeleteTest, GetTestById } from '../controllers/controller.js'
const router = Router()

router.get("/", GetTest);

router.get("/:id", GetTestById);

router.post("/", PostTest);

router.put("/:id", PutTest);

router.delete("/:id", DeleteTest);

export default router