const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

// Only Admins can access these
router.use(authMiddleware, roleMiddleware(["admin"]));

/**
 * @swagger
 * /admin/specializations:
 *   post:
 *     summary: Add a new specialization
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the specialization
 *                 example: Cardiology
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Specialization added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Specialization added successfully
 *                 specialization:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Cardiology
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid request
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post("/specializations", adminController.addSpecialization);
/**
 * @swagger
 * /admin/doctors:
 *   post:
 *     summary: Add a new doctor
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the doctor
 *                 example: Dr. John Doe
 *               email:
 *                 type: string
 *                 description: Email of the doctor
 *                 example: [EMAIL_ADDRESS]
 *               phone:
 *                 type: string
 *                 description: Phone number of the doctor
 *                 example: 1234567890
 *               specialization_id:
 *                 type: integer
 *                 description: ID of the specialization
 *                 example: 1
 *               gender:
 *                 type: string
 *                 description: Gender of the doctor
 *                 example: Male
 *               experience:
 *                 type: integer
 *                 description: Experience of the doctor in years
 *                 example: 10
 *               bio:
 *                 type: string
 *                 description: Biography of the doctor
 *                 example: Experienced cardiologist with 10 years of experience
 *               image_url:
 *                 type: string
 *                 description: URL of the doctor's image
 *                 example: https://example.com/doctor.jpg
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - specialization_id
 *               - gender
 *               - experience
 *               - bio
 *               - image_url
 *     responses:
 *       201:
 *         description: Doctor added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Doctor added successfully
 *                 doctor:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Dr. John Doe
 *                     email:
 *                       type: string
 *                       example: [EMAIL_ADDRESS]
 *                     phone:
 *                       type: string
 *                       example: 1234567890
 *                     specialization_id:
 *                       type: integer
 *                       example: 1
 *                     gender:
 *                       type: string
 *                       example: Male
 *                     experience:
 *                       type: integer
 *                       example: 10
 *                     bio:
 *                       type: string
 *                       example: Experienced cardiologist with 10 years of experience
 *                     image_url:
 *                       type: string
 *                       example: https://example.com/doctor.jpg
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid request
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post("/doctors", adminController.addDoctor);

module.exports = router;
