# Backend-Server

This project is a backend server for a lending platform built with Node.js and the Express framework. It provides a REST API to manage users, equipment, and borrow records.

## Features

### Routes

- **Users**
  - `GET /users` - Retrieve all users
  - `POST /users` - Create a new user
  - `GET /users/:id` - Retrieve a specific user
  - `PUT /users/:id` - Update a user
  - `DELETE /users/:id` - Delete a user

- **Equipment**
  - `GET /equipment` - Retrieve all equipment
  - `POST /equipment` - Create a new equipment item
  - `GET /equipment/:id` - Retrieve a specific equipment item
  - `PUT /equipment/:id` - Update equipment
  - `DELETE /equipment/:id` - Delete equipment

- **Borrow**
  - `GET /borrows` - Retrieve all borrow records
  - `POST /borrows` - Create a new borrow record
  - `GET /borrows/:id` - Retrieve a specific borrow record
  - `PUT /borrows/:id` - Update a borrow record
  - `DELETE /borrows/:id` - Delete a borrow record

## Models

- **User**
  - `ID`: Unique identifier
  - `Name`: User's name
  - `Email`: User's email address
  - `Role`: User role (e.g., Admin, Standard user)
  - `Password`: User's password
  - `Creation Date`: Date the user was created

- **Equipment**
  - `ID`: Unique identifier
  - `Item Number`: Item number
  - `Title`: Item title
  - `Image`: Item image (optional)
  - `Description`: Item description
  - `Quantity`: Number of available items
  - `User ID`: ID of the user managing the item

- **Borrow**
  - `ID`: Unique identifier
  - `User ID`: ID of the borrowing user
  - `Start Date`: Date of borrowing
  - `End Date`: Date of return
  - `Equipment IDs`: IDs of borrowed items

## Controllers

Handles business logic and links routes to methods (GET, POST, PUT, DELETE).

## API

Provides a REST API for client interactions, with error handling for missing values and routes.
