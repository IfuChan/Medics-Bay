const router = require('express').Router();

const { isLogin, isAuthenticated } = require('../middleware/auth.middleware');
const { isUser } = require('../middleware/role.middleware');

const { getDoctorView, getUserProfile, dashboardView, appointmentView } = require('../controllers/patient.controller');
const { create } = require('../controllers/appointment.controller');

router.get('/dashboard', isLogin, isUser, dashboardView);
router.get('/user-profile', isLogin, isUser, getUserProfile);
router.get('/doctors-profile/:id', getDoctorView);
router.get('/appointment/:doctorId', isLogin, isUser, appointmentView);
router.post('/appointment', isLogin, isUser, create);


module.exports = router;