const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        await User.create({
            username : username,  
            password : password   
        });
        res.json({
            message: "User created successfully"
        });
    }catch(e) {
        res.status(403).json({
            msg : "User creation failed"
        });
    }
});

router.get('/courses', async (req, res) => {

    const response = await Course.find({});
    res.json({
        courses: response
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
     await User.updateOne({
        username : username
    },{
        "$push": {
            purchasedCourses : courseId
        }
    })
    res.json({
        msg : "Course purchased succcesfuly"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: { 
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router