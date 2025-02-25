# MERN-Lecture-Scheduler

## Project Description
The MERN Lecture Scheduler is a web application that allows users to schedule and manage lectures. It is built using the MERN stack (MongoDB, Express.js, React, and Node.js).

## Installation
To install the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/mern-lecture-scheduler.git
    ```
2. Navigate to the project directory:
    ```bash
    cd mern-lecture-scheduler
    ```
3. Install the server dependencies:
    ```bash
    cd server
    npm install
    ```
4. Install the client dependencies:
    ```bash
    cd ../client
    npm install
    ```

## Usage
To run the project locally, follow these steps:

1. Start the server:
    ```bash
    cd server
    npx nodemon src/app.js
    ```
2. Start the client:
    ```bash
    cd ../client
    npm run dev
    ```

The application should now be running at `http://localhost:5173`.

## Features
- User authentication
- Lecture scheduling
- Lecture management
- Notifications

## Backend Routes

### Courses
- **GET /api/courses**: Get all courses
- **POST /api/courses**: Create a new course

### Instructors
- **GET /api/instructors**: Get all instructors
- **POST /api/instructors**: Create a new instructor
- **PUT /api/instructors/:id**: Update an instructor
- **DELETE /api/instructors/:id**: Delete an instructor

### Lectures
- **GET /api/lectures**: Get all lectures
- **POST /api/lectures**: Schedule a new lecture

## Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.
