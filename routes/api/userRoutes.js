const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);
router.route("/addfriend/:userId").put(addFriend);
router.route("/:userId/deletefriend/:friendId").delete(deleteFriend);

module.exports = router;
