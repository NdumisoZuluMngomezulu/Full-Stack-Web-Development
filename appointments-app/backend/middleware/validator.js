const { body, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
};

const registerValidation = [
    body('name').notEmpty().withMessage('Name is required').trim(),
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').isLength({ min: 6}).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['doctor','patient']).withMessage('Role must be doctor or patient'),
    handleValidation
];

const loginValidation = [
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidation
];

const createAppointmentValidation = [
    body('doctorEmail').isEmail().withMessage('Valid doctor email required').normalizeEmail(),
    body('date').isISO8601().withMessage('Valid date required').toDate(),
    body('reason').notEmpty().withMessage('Reason is required').trim().isLength({ min: 3}),
    handleValidation
];