const express = require('express');
const router = express.Router();
const {auth, doctorOnly} = require('../middleware/auth');
const appointmentController = require('../controllers/appointmentController');
const {
    createAppointmentValidation, 
    updateAppointmentValidation
} = require('../middleware/validators');

router.get('/',auth, appointmentController.getAllAppointments);
router.post('/', auth, createAppointmentValidation, appointmentController.createAppointment);
router.put('/:id', auth, updateAppointmentValidation, appointmentController.updateAppointment);
router.delete('/:id', auth, doctorOnly, appointmentController.deleteAppointment);

module.exports = router;

