/* This file defines the controller functions for handling borrows
   The functions include:
   - Retrieving all borrowed equipment
   - Creating a new borrowed equipment entry
   - Retrieving a single borrowed equipment entry by ID
   - Updating a borrowed equipment entry by ID
   - Deleting a borrowed equipment entry by ID
 */

var express = require('express');
var router = express.Router();

// Import the file system module to handle file operations
const fs = require('fs');

// Array to store borrowed equipments
let borrows = [];

// Load borrows from borrow.json
let jsonData = fs.readFileSync('models/borrow.json');
borrows = JSON.parse(jsonData);

/* GET: Retrieve all borrowed equipments */
const getAllBorrows = (req, res) => {
  console.log(borrows);
  res.json(borrows);
};

/* POST: Create a new borrowed equipment*/
const createBorrow = function (req, res) {

  let borrow = {
    id: req.body.id,
    userId: req.body.userId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    borrowedEquipmentIDs: req.body.borrowedEquipmentIDs,
  };

  console.log(borrow);

  // Add the new borrow to the borrows array
  borrows.push(borrow);

  // Update borrows array in borrow.json
  fs.writeFileSync("models/borrow.json", JSON.stringify(borrows, null, 2));

  res.json(borrow);
};

/* GET: Retrieve a single borrowed equipment by Id */
const getOneBorrow = (req, res, next) => {
  const borrowId = req.params.id;
  const borrow = borrows.find(b => b.id === borrowId); // Find the borrow with the matching ID

  if (borrow) {
    res.json(borrow);
  } else {
    res.json({ error: 'Borrow not found' });
  }
};

/* PUT: Update a borrowed equipment by Id */
const updateBorrow = (req, res) => {
  const borrowId = req.params.id;
  const borrow = borrows.find(b => b.id === borrowId);

  if (borrow) {
    // Update the borrow fields with the values from the request body or keep existing values
    const updatedBorrow = req.body;
    borrow.userId = updatedBorrow.userId || borrow.userId;
    borrow.startDate = updatedBorrow.startDate || borrow.startDate;
    borrow.endDate = updatedBorrow.endDate || borrow.endDate;
    borrow.borrowedEquipmentIDs = updatedBorrow.borrowedEquipmentIDs || borrow.borrowedEquipmentIDs;

    fs.writeFileSync("models/borrow.json", JSON.stringify(borrows, null, 2));

    res.json("Updated");
  } else {
    res.json({ error: 'Borrow not found' });
  }
};

/* DELETE: Delete a borrow transaction by ID */
const deleteBorrow = (req, res) => {
  const borrowId = req.params.id;
  const initialLength = borrows.length; // Store the initial length of the borrows array

  // Filter out the borrow with the matching ID
  borrows = borrows.filter(b => b.id !== borrowId);

  if (borrows.length < initialLength) {
    fs.writeFileSync("models/borrow.json", JSON.stringify(borrows, null, 2));
    res.send('Deleted');
  } else {
    res.status.json({ error: 'Borrow not found' });
  }
}

module.exports = {
  getAllBorrows,
  createBorrow,
  getOneBorrow,
  updateBorrow,
  deleteBorrow
}

