/**
 * This file defines the routes for handling users 
 * The routes include:
 * - Retrieving all users
 * - Creating a new user
 * - Retrieving a single user by ID
 * - Updating a user by ID
 * - Deleting a user by ID
 */

var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get("/users", userController.getAllUsers);
router.post("/users", userController.postNewUser);
router.get("/users/:id", userController.getOneUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
