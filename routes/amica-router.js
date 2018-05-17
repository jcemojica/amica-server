const router = require('express').Router();
const UserController = require('../controllers/user-controller');

router.post('/add-user', UserController.addUser);
router.get('/find-by-email', UserController.findByEmail);
router.get('/find-me/:id', UserController.findCurrentUser);
router.post('/update-basics', UserController.updateBasicDetails);
router.post('/change-settings', UserController.changeSettings);
router.get('/get-friends', UserController.getFriends);
router.get('/find-by-name/:name', UserController.findByName);

router.get('/view-all', UserController.findAll);

module.exports = router;