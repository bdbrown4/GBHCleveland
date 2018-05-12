const express = require('express');
const router = express.Router();
const UserInfo = require('../models/userInfo');

// Send UserInfo to DB
router.post('/postUserInfo', (req,res,next) => {
    let userInfo = new UserInfo({
        name: req.body.name,
        email: req.body.email
    });

    UserInfo.addUserInfo(userInfo, (err, userInfo) => {
        if(err){
            res.json({success: false, msg: 'Failed to send info'});
        } else {
            res.json({success:true, msg: 'Info sent successfully'});
        }
    });
});

module.exports = router;