const adminService = require("../services/admin.service");

exports.addSpecialization = async (req, res) => {
  try {
    const spec = await adminService.createSpecialization(
      req.body.name,
      req.body.description,
    );
    res.status(201).json(spec);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addDoctor = async (req, res) => {
  try {
    const doctor = await adminService.createDoctor(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
