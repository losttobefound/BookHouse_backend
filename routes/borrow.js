/**
 * This file defines the routes for handling borrowed equipments
 * The routes include:
 * - Retrieving all borrowed equipments
 * - Creating a new borrowed equipment 
 * - Retrieving a single borrowed equipment by ID
 * - Updating a borrowed equipment by ID
 * - Deleting a borrowed equipment by ID
 */

var express = require('express');
var router = express.Router();
const borrowController = require('../controllers/borrowController');

router.get("/borrows", borrowController.getAllBorrows);
router.post("/borrows", borrowController.createBorrow);
router.get("/borrows/:id", borrowController.getOneBorrow);
router.put("/borrows/:id", borrowController.updateBorrow);
router.delete("/borrows/:id", borrowController.deleteBorrow);


module.exports = router;
