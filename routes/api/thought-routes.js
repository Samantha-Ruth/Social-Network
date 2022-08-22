const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  // getThoughtsByUser,
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
  .get(getThoughtById)
  .put(updateThought);

// /api/thoughts/<userId>
router
  .route('/:userId')
  .post(addThought)
  // .get(getThoughtsByUser)

// /api/thoughts/<userId>/<thoughtID>
router
  .route('/:userId/:thoughtId')
  .delete(deleteThought);

// /api/thoughts/<userID>/<thoughtId>/<reactionId> 
router 
.route('/:thoughtId/reactions')
.put(createReaction);

// /api/thoughts/<userId>/<thoughtId>/<reactionId>
router
  // .route('/:userId/:thoughtId/:reactionId')
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;