const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const server = app.listen(port, () => {
    console.log("Server started on port "+ port);
});
// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Index Route
app.get('/', (req, res) => {
    res.send('invalid endpoint')
});

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

