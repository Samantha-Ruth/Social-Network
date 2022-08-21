const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  getThoughtsByUser,
  addThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThoughts)

// /api/thoughts/<thoughtId>
router
  .route('/:thoughtId')
  .get(getThoughtById);

// /api/thoughts/<userId>
router
  .route('/:userId')
  .post(addThought)
  .get(getThoughtsByUser)

// /api/thoughts/<userId>/<thoughtID>
router
  .route('/:userId/:thoughtId')
  .put(updateThought)
  .put(createReaction)
  .delete(deleteThought);

// /api/thoughts/<userID>/<thoughtId>/<reactionId>
router
  .route('/:userId/:thoughtId/:reactionId')
  .delete(deleteReaction);

module.exports = router;