const router = require('express').Router();

const globalRoutes = require('./global.routes');
const authRoutes = require('./auth.routes');
const patientRoutes = require('./patient.routes');

router.use('/', authRoutes);
router.use('/', globalRoutes);
router.use('/', patientRoutes);

module.exports = router;
