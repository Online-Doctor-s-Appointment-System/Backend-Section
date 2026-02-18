const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

// All routes require authentication and patient role
router.use(authMiddleware, roleMiddleware(['patient']));

/**
 * @swagger
 * /patient/dashboard:
 *   get:
 *     summary: Get patient dashboard data
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard information for the authenticated patient
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 upcoming:
 *                   type: array
 *                   items:
 *                     type: object
 *                 history:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Requires patient role
 */
router.get('/dashboard', patientController.getDashboard);

module.exports = router;
