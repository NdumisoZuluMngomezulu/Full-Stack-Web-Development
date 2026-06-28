const Appointment = require('../models/Appointment');
const User = require('../models/User');

//GET all appointments for any user, must be logged in
exports.getAllAppointments = async(req, res) => {
    try{
        let query = {};
        //attatch patientid to query if the user is a patient so only the patients appointment shows up
        if (req.user.role === 'patient'){
            query.patientId = req.user.id;
        }

        const appointments = await Appointment.find(query)
            .populate('doctorId', 'name-email')
            .populate('patientId', 'name email')
            .sort({ date: 1});
        res.json(appointments);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

//POST to create appointments for any user, must be logged in
exports.createAppointment = async (req, res) => {
    const {doctorEmail, date, reason} = req.body;
    try {
        const doctor = await User.findOne({
            email: doctorEmail, role: 'doctor'
        });
        if (new Date(date) < new Date()){
            return res.status(400).json({ msg: 'Cannot book appointment in the past'});
        }

        const newAppointment = new Appointment({
            doctorId: doctor._id,
            patientId: req.user.id,
            date,
            reason
        });

        const appointment = await newAppointment.save();
        await appointment.populate('doctorId', 'name email');
        await appointment.populate('patientId', 'name email');
        res.json(appointment);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

//PUT update appointment
exports.updateAppointment = async (req, res) => {
    try {
        let appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(400).json({ msg: 'Appointment not found'});

        //chek=ck permission
        const isDoctor = req.user.role === 'doctor' && appointment.doctorId.toString() === req.user.id;
        const isPatient = req.user.role === 'patient' && appointment.patientId.toString() ===req.user.id;
        
        if (!isDoctor && )
    }
};