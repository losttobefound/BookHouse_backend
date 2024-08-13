/* This file defines the controller functions for handling users 
   The functions include:
   - Retrieving all users
   - Creating a new user
   - Retrieving a single user by ID
   - Updating user by ID
   - Deleting user by ID
 */

var express = require('express');
var router = express.Router();
const fs = require('fs'); // Import the file system module to handle file operations
const { userInfo } = require('os');
let users = []; // Array to store many users


// Load users from JSON file
let jsonData = fs.readFileSync('models/user.json');
users = JSON.parse(jsonData);


/* GET: Retrieve all users */
const getAllUsers = (req, res) => {
    console.log(users);
    res.json(users);
}

/* POST: Create a new user*/
const postNewUser = (req, res) => {

    let user = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        date: req.body.date,
    };

    console.log(user);
    // Add new user to users array
    users.push(user);
    // Update users array in user.json
    fs.writeFileSync("models/user.json", JSON.stringify(users, null, 2)) 
    res.json(user);
};

/* GET: Retrieve a single user by Id */
let getOneUser = (req, res, next) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === userId); // Find the user with the matching Id

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
};

/*PUT: update user by Id */
const updateUser = (req, res) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === userId);

    if (user) {
        // Update the user with the values from the request body or keep existing values
        const updatedUser = req.body;
        user.name = updatedUser.name || user.name;
        user.email = updatedUser.email || user.email;
        user.role = updatedUser.role || user.role;
        user.password = updatedUser.password || user.password;
        user.date = updatedUser.date || user.date;

        res.json("Geändert")
        fs.writeFileSync("models/user.json", JSON.stringify(users, null, 2)) // update user.json
    } else {
        res.status(404).json({ error: 'User not found' });
    }
};


/* DELETE: delete user by Id*/
const deleteUser = (req, res) => {
    const userId = req.params.id;
    const initialLength = users.length; //Store the initial length of the users array

    // Filter out the user with the matching Id
    users = users.filter(u => u.id !== userId);

    if (users.length < initialLength) {
        fs.writeFileSync("models/user.json", JSON.stringify(users, null, 2));
        res.send('Gelöscht');
    } else {
        res.status(404).json({ error: 'User not found' });
    }
}

module.exports =
{
    getAllUsers,
    postNewUser,
    getOneUser,
    updateUser,
    deleteUser, 
}



