const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// All routes must pass through the JWT validator
router.use( jwtValidator );

// Get events
router.get('/', getEvents);

// Create new event
router.post(
    '/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom( isDate ),
        check('end', 'End date is required').custom( isDate ),
        fieldValidator
    ], 
    createEvent
);

// Update event
router.put(
    '/:id', 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom( isDate ),
        check('end', 'End date is required').custom( isDate ),
        fieldValidator
    ], 
    updateEvent
);

// Delete event
router.delete('/:id', deleteEvent);

module.exports = router;
