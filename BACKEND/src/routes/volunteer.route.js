import express from 'express';
import volunteerController  from "../controllers/volunteer.controller.js"
const router = express.Router();

router.post("/register", volunteerController.registerVolunteer);

export default router; 