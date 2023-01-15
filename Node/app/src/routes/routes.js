import express from "express";
import { addScore, deleteScore, getScore, top10, updateScore } from "../controllers/score-controller.js";

const router = express.Router();

router.get(`/scoresOfUser/:userId`, getScore);
router.get(`/top10`, top10);
router.post(`/score`, addScore);
router.patch(`/score/:userId`, updateScore);
router.delete(`/score/:id`, deleteScore);

export default router;
