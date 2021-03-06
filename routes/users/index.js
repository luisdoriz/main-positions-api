const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const UsersController = require('../../controllers/users');

//GET
router.get("/roles", auth.valid, UsersController.getRoles);
router.get("/individual", auth.valid, UsersController.getUser);
router.get("/admins/:idOrganization", auth.valid, UsersController.getAdmins);
router.get("/", auth.valid, UsersController.getUsers);

//POST
router.post("/login", UsersController.logIn);
router.post("/", UsersController.postUser);

//PUT
router.put("/subscribe", auth.valid, UsersController.subscribeUser);
router.put("/:idUser", auth.valid, UsersController.putUser);

//DELETE
router.delete("/:idUser", auth.valid, UsersController.deleteUser);

module.exports = router;
