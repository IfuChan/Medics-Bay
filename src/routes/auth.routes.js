const router = require('express').Router();

const { isLogin } = require('../middleware/auth.middleware')
const { isUser } = require('../middleware/role.middleware')

const { loginView, signupView, deAuth, registration, login } = require('../controllers/auth.controller');

router.get('/login', loginView);
router.get('/signup', signupView);
router.get('/logout', isLogin, isUser, deAuth);
router.post('/register', registration);
router.post('/login', login);

module.exports = router;