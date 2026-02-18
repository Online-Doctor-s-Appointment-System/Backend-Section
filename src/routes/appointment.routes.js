const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

/**
 * @swagger
 * /appointment/specializations:
 *   get:
 *     summary: Get list of medical specializations
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: An array of specialization objects
 */
router.get("/specializations", appointmentController.getSpecializations); // Public

// Protected routes
router.use(authMiddleware, roleMiddleware(["patient"]));

/**
 * @swagger
 * /appointment/doctors/{specialization_id}:
 *   get:
 *     summary: Get doctors by specialization
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: specialization_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the specialization
 *     responses:
 *       200:
 *         description: List of doctors for the given specialization
 */
router.get(
  "/doctors/:specialization_id",
  appointmentController.getDoctorsBySpecialization,
);

/**
 * @swagger
 * /appointment/slots/{doctor_id}:
 *   get:
 *     summary: Get available slots for a doctor
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: doctor_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the doctor
 *     responses:
 *       200:
 *         description: Available time slots for the doctor
 */
router.get("/slots/:doctor_id", appointmentController.getFreeSlots);

/**
 * @swagger
 * /appointment/book:
 *   post:
 *     summary: Book an appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctor_id:
 *                 type: string
 *               specialization_id:
 *                 type: string 
 *               date:
 *                 type: string
 *                 format: date
 *               start_time:
 *                 type: string
 *               end_time:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [online, in-person]
 *               notes:
 *                 type: string
 *             required:
 *               - doctor_id
 *               - specialization_id
 *               - date
 *               - start_time
 *               - end_time
 *               - type
 *     responses:
 *       201:
 *         description: Appointment successfully booked
 *       400:
 *         description: Validation error / bad request
 */
router.post("/book", appointmentController.bookAppointment);

module.exports = router;
