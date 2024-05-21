const express = require("express");
const router = express.Router();
const {
  handleGetAllUser,
  handleGetUserByID,
  handleUpdateUserByID,
  handleDeleteUserByID,
  handleCreateNewUser,
} = require("../controllers/user");

router.route("/").get(handleGetAllUser).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserByID)
  .patch(handleUpdateUserByID)
  .delete(handleDeleteUserByID);

module.exports = router;
