const router = require('express').Router();

const { isLogin } = require('../middleware/auth.middleware');
const { isUser } = require('../middleware/role.middleware');

const { getDoctorView, getUserProfile, dashboardView, appointmentView } = require('../controllers/patient.controller');

router.get('/dashboard', isLogin, isUser, dashboardView);
router.get('/user-profile', isLogin, isUser, getUserProfile);
router.get('/doctors-profile/:id', getDoctorView);
router.get('/appointment', isLogin, isUser, appointmentView);


module.exports = router;