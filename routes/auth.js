const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');

const router = Router();

router.post(
    '/new',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password should be 6 characters long').isLength({ min: 6 }),
        fieldValidator
    ],
    createUser
);

router.post(
    '/',
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password should be 6 characters long').isLength({ min: 6 }),
        fieldValidator
    ],
    loginUser
);

router.get('/renew', jwtValidator, renewToken);

module.exports = router;
