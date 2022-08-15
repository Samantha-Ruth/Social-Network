const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// /api/thought
router
  .route('/')
  .get(getAllThoughts)
  .post(addThought);

// /api/thought/:id
router
// should this be api/thought/:thoughtid?
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

//Get all reactions by user's thought
// /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(createReaction)

// /api/thoughts/thoughtId/reactionId
// Should this be /api/thoughts/<USERID>/:thoughtId/reactionId
router
  .route('/:thoughtId/:reactionId')
  .delete(deleteReaction);

module.exports = router;
