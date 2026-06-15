import express from 'express';
import adminController from "../controllers/admin.controller.js"
import adminMiddleware from "../middleware/admin.middleware.js"
const router = express.Router();
router.post("/register", adminController.registerAdmin)
router.post("/login", adminController.loginAdmin)
router.post("/logout", adminController.logoutAdmin)
router.get("/volunteers", adminMiddleware.adminAuthMiddleware, adminController.getVolunteers)
export default router; 