const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const UsersController = require('../../controllers/users');

//GET
router.get("/", auth.valid, UsersController.getUsers);
router.get("/roles", auth.valid, UsersController.getRoles);

//POST
router.post("/", UsersController.postUser);
router.post("/login", UsersController.logIn);

//PUT
router.put("/:idUser", auth.valid, UsersController.putUser);

//DELETE
router.delete("/", auth.valid, UsersController.deleteUser);

module.exports = router;
