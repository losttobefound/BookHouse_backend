/**
 * This file defines the routes for handling equipments 
 * The routes include:
 * - Retrieving all equipments
 * - Creating a new equipment
 * - Retrieving a single equipment by ID
 * - Updating an equipment by ID
 * - Deleting an equipment by ID
 */

var express = require('express');
var router = express.Router();
const equipmentController = require('../controllers/equipmentController');

router.get("/equipment", equipmentController.getAllEquipments); 
router.post("/equipment", equipmentController.postNewEquipment); 
router.get("/equipment/:id", equipmentController.getOneEquipment); 
router.put("/equipment/:id", equipmentController.updateEquipment);
router.delete("/equipment/:id", equipmentController.deleteEquipment); 

module.exports = router;


