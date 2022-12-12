const router = require('express').Router();

const { landingView, aboutUsView, reviewView, specialistView, searchDoctors } = require('../controllers/global.controller');

router.get('/', landingView);
router.get('/aboutus', aboutUsView);
router.get('/review', reviewView);
router.post('/searchDoctors', searchDoctors);
router.get('/department/:department', specialistView);

module.exports = router;