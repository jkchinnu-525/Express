const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../config");

// Admin Routes
router.post('/signup', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // checking if a user with this username already exists
    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        message: 'Admin created successfully'
    })
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const validation = await Admin.find({});
    if(validation) {
        const token = jwt.sign({
            username,
        },Jwt_secret);
        res.json({
            token
        })
    } else {
        res.status(403).json({
            msg : "Incorrect username or password"
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const imagelink = req.body.imagelink;
    const cost = req.body.cost;
    // zod
    const newCourse = await Course.create({
        title,
        description,
        imagelink,
        cost
    })

    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const response = await Course.find({});
    res.json({
        Courses : response
    })
});

module.exports = router;