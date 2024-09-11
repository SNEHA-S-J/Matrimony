const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 5501;

// Use cors middleware
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Arun@123',
    database: 'matrimony'
});

db.connect(function(error) {
    if (error) throw error;
    console.log("Connected to the database successfully!");
});

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Define a route for the root URL
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

// Handle form submission
app.post('/signup', function(req, res) {
    const { email, password, confirmPassword } = req.body;
    console.log(email, password, confirmPassword);

    if (email && password && confirmPassword) {
        const query = 'INSERT INTO signup (email, password, confirm_password) VALUES (?, ?, ?)';
        db.query(query, [email, password, confirmPassword], function(err, result) {
            if (err) {
                console.error('Error inserting data:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send('Signup successful');
        });
    } else {
        res.status(400).send('Email, password, and confirm password are required');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
