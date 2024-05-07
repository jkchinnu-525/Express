const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Admin, User, Course} = require("../db");
const {Jwt_secret} = require("../config");
const jwt = require("jsonwebtoken");

// User Routes
router.post('/signup', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // checking if a user with this username already exists
    await User.create({
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
    const validation = await User.find({});
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

router.post('/courses', userMiddleware, async (req, res) => {
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
router.get('/courses', async (req, res) => {
    const response = await Course.find({});
    res.json({
        courses: response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const username = req.username;
    const courseId = req.params.courseId;
    await User.updateOne({
        username : req.username
    },{
        "$push" : {
            purchasedCourses : courseId
        }
    });
    res.json({
        msg : "Course purchased succesfully"
    });
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const user = await User.findOne({
        username : req.username
    })
    const coursesbought = await Course.find({
        _id: {
            "$in" : user.purchasedCourses
        }
    })
    res.json({
        courses : coursesbought
    })
});

module.exports = router