const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Router } = require("express");
const router = Router();
const { Admin,Course } = require("../db");

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        await Admin.create ({
        username : username,
            password : password
        });
        res.status(400).json({
            msg : "Admin Created Succesfully"
        });
    } catch(e) {
        res.status(403),json({
            msg : "Admin account not created "
        });
    }
}); 

router.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const imagelink = req.body.imagelink;
    const cost = req.body.cost;
    try {
        const newcourse  = await Course.create({
            title,
            description,
            imagelink,
            cost
        });
        console.log(newcourse);
        res.json({
            msg : "Course Created Successfully",courseid: newcourse.id
        });
    }catch(e) {
        res.status(403).json({
            msg : "Course has not been created"
        });
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const response = await Course.find({});
    res.json({
        Courses : response
    })
});

module.exports = router;