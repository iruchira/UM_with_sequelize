const express = require ("express");
const{
    // viewAllUsers,
    addUsers,
    deleteUsers,
    getSingleUser,
    updateUsers,
    paginationUser
}= require("../Controller/userController.js");

const router = express.Router();
// router.route("/").get(viewAllUsers);
router.route("/all").get(paginationUser);
router.route("/").post(addUsers);
router.route("/:email").get(getSingleUser);
router.route("/:id").patch(updateUsers);
router.route("/:id").delete(deleteUsers);
module.exports = router;