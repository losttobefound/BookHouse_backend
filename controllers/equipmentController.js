/* This file defines the controller functions for handling equipments 
   The functions include:
   - Retrieving all equipments
   - Creating a new equipment
   - Retrieving a single equipment by ID
   - Updating equipment by ID
   - Deleting equipment by ID
 */

var express = require('express');
var router = express.Router();

// Array to store many equipments
let equipments = [];

// Import the file system module to handle file operations
const fs = require('fs');

// Load users from JSON file
let jsonData = fs.readFileSync('models/equipment.json');
equipments = JSON.parse(jsonData);

/* GET: Retrieve all equipments */
const getAllEquipments = (req, res) => {
    console.log(equipments);
    res.json(equipments);
}

/* POST: Create a new equipment */
const postNewEquipment = (req, res) => {

    let equipment = {
        id: req.body.id,
        equipment_number: req.body.equipment_number,
        title: req.body.title,
        description: req.body.description,
        quantity: req.body.quantity,
        userID: req.body.userID
    };

    console.log(equipment);
    // Add new equipment to equipments array
    equipments.push(equipment);
    // Update equipments array in equipment.json
    fs.writeFileSync("models/equipment.json", JSON.stringify(equipments, null, 2))
    res.json(equipment);
};

/* GET: Retrieve a single equipment by Id */
const getOneEquipment = (req, res, next) => {
    const equipmentId = req.params.id;
    const equipment = equipments.find(e => e.id === equipmentId); // Find equipment with the matching Id

    if (equipment) {
        res.json(equipment);
    } else {
        res.status(404).json({ error: 'Article not found' });
    }
};

/*PUT: update equipment by Id */
const updateEquipment =  (req, res) => {
    const equipmentId = req.params.id; // extract the equipment ID from request parameters
    const equipment = equipments.find(e => e.id === equipmentId);

    if (equipment) {
        // Update equipment with the values from the request body or keep existing values
        const updatedEquipment = req.body;
        equipment.equipment_number = updatedEquipment.equipment_number || equipment.equipment_number;
        equipment.title = updatedEquipment.title || equipment.title;
        equipment.description = updatedEquipment.description || equipment.description;
        equipment.quantity = updatedEquipment.quantity || equipment.quantity;
        equipment.userId = updatedEquipment.userId || equipment.userId;

        res.status(200).json("Geändert")
        fs.writeFileSync("models/equipment.json", JSON.stringify(equipments, null, 2)) // update equipment.json
    } else {
        res.status(404).json({ error: 'Article not found' });
    }
};

/* DELETE: Delete equipment */
const deleteEquipment = (req, res) => {
    const equipmentId = req.params.id;
    const initialLength = equipments.length; //Store the initial length of the equipments array
    // Filter out the equipment with the matching Id
    equipments = equipments.filter(e => e.id !== equipmentId);

    if (equipments.length < initialLength) {
        fs.writeFileSync("models/equipment.json", JSON.stringify(equipments, null, 2));
        res.send('Gelöscht');
    } else {
        res.status(404).json({ error: 'Article not found' });
    }
};

module.exports = {
    getAllEquipments,
    postNewEquipment,
    getOneEquipment,
    updateEquipment,
    deleteEquipment
}
