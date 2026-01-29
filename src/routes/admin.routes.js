const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

// Only Admins can access these
router.use(authMiddleware, roleMiddleware(["admin"]));

router.post("/specializations", adminController.addSpecialization);
router.post("/doctors", adminController.addDoctor);

module.exports = router;
