const router = require('express').Router();

const { 
  getAllUsers,
  createUser, 
  getUserById, 
  updateUser, 
  deleteUser 
} = require('../../controllers/user-controller');

// set up GET all and POST at /api/users
router
.route('/')
.get(getAllUsers)
.post(createUser);

// setup GET one, PUT, and DELETE
// at /api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

module.exports = router;