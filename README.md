# MongoDB CRUD API

A simple and efficient RESTful API for user management built with Express.js and MongoDB.  
This API provides complete CRUD (Create, Read, Update, Delete) operations for user data with proper validation and error handling.

---

## Features

- RESTful API Design - Clean and predictable endpoints
- MongoDB Integration - Robust database operations with Mongoose ODM
- Input Validation - Comprehensive validation and error messages
- Error Handling - Proper HTTP status codes and meaningful error responses
- User Management - Full CRUD operations for user data
- Modern JavaScript - ES6+ syntax with async/await

---

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd your-project-directory
```

### Install dependencies

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/user-crud-api
NODE_ENV=development
```

### Start the application

```bash
# Development mode
npm run dev

# Production mode
npm start
```

---

## Database Setup

### Local MongoDB

```bash
# Install MongoDB locally and start the service
mongod

# Or use MongoDB as a service
brew services start mongodb-community   # macOS
sudo systemctl start mongod             # Linux
```

### MongoDB Atlas (Cloud)

Update your `.env` file with the Atlas connection string:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/user-crud-api
```

---

## API Endpoints

**Base URL:**

```
http://localhost:3000/api
```

| Method | Endpoint   | Description         | Request Body |
| ------ | ---------- | ------------------- | ------------ |
| GET    | /          | API welcome message | -            |
| GET    | /users     | Get all users       | -            |
| GET    | /users/:id | Get user by ID      | -            |
| POST   | /users     | Create new user     | JSON         |
| PUT    | /users/:id | Update user by ID   | JSON         |
| DELETE | /users/:id | Delete user by ID   | -            |

---

## Usage Examples

### 1. Get All Users

```bash
curl http://localhost:3000/api/users
```

**Response:**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30,
      "isActive": true,
      "createdAt": "2023-10-05T12:00:00.000Z",
      "updatedAt": "2023-10-05T12:00:00.000Z"
    }
  ]
}
```

### 2. Get User by ID

```bash
curl http://localhost:3000/api/users/507f1f77bcf86cd799439011
```

### 3. Create New User

```bash
curl -X POST http://localhost:3000/api/users   -H "Content-Type: application/json"   -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "age": 25,
    "isActive": true
  }'
```

**Success Response (201):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "age": 25,
    "isActive": true,
    "createdAt": "2023-10-05T12:00:00.000Z",
    "updatedAt": "2023-10-05T12:00:00.000Z"
  }
}
```

**Validation Error Response (400):**

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Please enter a valid email"
    }
  ]
}
```

### 4. Update User

```bash
curl -X PUT http://localhost:3000/api/users/507f1f77bcf86cd799439011   -H "Content-Type: application/json"   -d '{
    "name": "John Updated",
    "age": 31
  }'
```

### 5. Delete User

```bash
curl -X DELETE http://localhost:3000/api/users/507f1f77bcf86cd799439011
```

**Response:**

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## User Model Schema

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: emailRegex
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  },
  isActive: {
    type: Boolean,
    default: true
  }
}
```

---

## Error Handling

The API returns appropriate HTTP status codes and structured error messages:

- **200** - Success
- **201** - Created successfully
- **400** - Bad Request (Validation errors)
- **404** - Resource not found
- **500** - Internal server error

**Error Response Format:**

```json
{
  "success": false,
  "error": "Error message description"
}
```

---

## Project Structure

```
project-root/
├── app.js                 # Main application entry point
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── .gitignore             # Git ignore rules
├── routes/
│   └── userRoutes.js      # User route definitions
├── controllers/
│   └── userController.js  # User business logic
└── models/
    └── User.js            # Mongoose user schema
```

---

## Scripts

- `npm start` – Start production server
- `npm run dev` – Start development server with nodemon
- `npm test` – Run tests (if configured)

---

## Validation Rules

- **Name:** Required, max 50 characters, trimmed
- **Email:** Required, unique, valid format, lowercase, trimmed
- **Age:** Optional, between 0–120
- **isActive:** Boolean, defaults to true

---

## Best Practices Implemented

- RESTful API design principles
- Proper HTTP status codes
- Input validation and sanitization
- Consistent response format
- Error handling middleware
- Environment configuration
- Code modularity and separation of concerns
- Async/await for database operations
- Comprehensive documentation

---

## Technologies Used

- Express.js – Web application framework
- Mongoose – MongoDB object modeling
- dotenv – Environment variable management
- JavaScript ES6+ – Modern JavaScript features

---

## Contributing

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## Author

**Your Name**  
GitHub: [@yourusername](https://github.com/yourusername)  
Email: your.email@example.com

---

## Acknowledgments

- Express.js team for the framework
- MongoDB for the robust database solution
- Mongoose team for the excellent ODM

---

Star this repository if you find it helpful!
