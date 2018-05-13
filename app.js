const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const app = express();
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log('Server started on port '+ port);
});

// Connect to Database (mongoose)
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', () =>{
console.log('Connected to database through mongoose on '+ config.database);
});

// On error
mongoose.connection.on('error', (err) =>{
console.log('Database error: '+ err);
});

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

const userInfo = require('./routes/userInfo');

app.use('/postUserInfo', userInfo);

// Index Route
app.get('/', (req, res) => {
    res.send('invalid endpoint')
});

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const UserInfo = require('./models/userInfo');

// Send UserInfo to DB
app.post('/postUserInfo', (req,res,next) => {
    let userInfo = new UserInfo({
        name: req.body.name,
        email: req.body.email
    });

    UserInfo.addUserInfo(userInfo, (err, userInfo) => {
        if(err){
            console.log(err);
            res.json({success: false, msg: 'Failed to send info'});
        } else {
            res.json({success:true, msg: 'Info sent successfully'});
        }
    });
});

