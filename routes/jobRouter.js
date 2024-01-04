import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  createNewJob,
  findJob,
  editJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";
import {
  validateIdParameter,
  validateJobInput,
} from "../middleware/validationMiddleware.js";
import { checkTestUser } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllJobs)
  .post(checkTestUser, validateJobInput, createNewJob);
router.route("/stats").get(showStats);
router
  .route("/:id")
  .get(checkTestUser, validateIdParameter, findJob)
  .put(checkTestUser, validateIdParameter, validateJobInput, editJob)
  .delete(checkTestUser, validateIdParameter, deleteJob);

export default router;
