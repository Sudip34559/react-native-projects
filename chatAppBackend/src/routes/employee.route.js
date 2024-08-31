import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { createEmployee } from "../controller/employee.controller.js";

const router = Router();
router.route("/create-employee").post(upload.single("csvFile"), createEmployee);

export default router;
