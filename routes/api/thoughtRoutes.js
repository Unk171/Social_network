const router = require("express").Router();
const {
  getThought,
  getThoughts,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);
router
  .route("/:thoughtId")
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);
router.route("/reactions/:thoughtId").put(addReaction);
router.route("/:thoughtId/deletereaction/:reactionId").delete(deleteReaction);

module.exports = router;
