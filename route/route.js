const express = require('express');
const passport = require('passport')
const { body, validationResult } = require('express-validator');
const route = express.Router()
const { getHotelOne,
    getHotelALL,
    postHotel,
    patchHotel,
    deleteHotel } = require('../controllers/hotelControllers')

// Get one //
route.get('/hotel/:id', getHotelOne)
// Get All //
route.get('/hotel', getHotelALL)
// Post //
route.post('/hotel', postHotel)
// Patch //
route.patch('/hotel/:id', patchHotel)
// Delete // 
route.delete('/hotel/:id', deleteHotel)


// Authentification //

route.post('/signup', passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.json({
            massage: "Signup Ok",
            user: req.user
        })
    }
)


route.post(
    '/login', 
    body('email').trim().isEmail().normalizeEmail(),
    (req, res, next) => {
        passport.authenticate('login', (err, user) => {
            if(err || !user){
                res.status(400).json({
                    success: false,
                    message: 'Unauthorized',
                });
            } else {
                req.user = user
                next()
            }
        }) (req, res, next)
    }, (req, res) => {
        req.login(req.user, (err) => {
            if(err){
                res.status(500).json({
                    succes : false,
                    message : 'An error occurred while processing your request',
                })
            } else {
                res.json({
                    succes : true,
                    user : {
                       email : req.user.email,
                       password: req.user.password,
                    }
                })
            }
        })
    }
    )

// route.post('/login', (req, res, next) => {
//     passport.authenticate('login', async (err, user) => {
//         try {
//             if (err || !user) {
//                 res.status(401).json({
//                     success: false,
//                     message: 'Unauthorized',
//                 });
//                 // const error = new Error('Une erreur est survenue')
//                 // return next(error) // 
//             } else {
//                 req.user = user;
//                 return next();
//             }

//             req.login(req.user, { session: false }, async (error) => {
//                 if (error) {
//                     res.status(500).json({
//                         success: false,
//                         msg: 'An error occurred while processing your request',
//                     });
//                 }
//                 else {
//                     res.json({
//                         success: true,
//                         user: {
//                             email: req.user.email,
//                             password: req.user.password,
//                         },
//                     });
//                 }
//             })

//         } 
//         catch (error) {
//             return next(error)
//         }
//     })(req, res, next)
// })


route.get('/succes', (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            user: {
                email: req.user.email,
                password: req.user.password,
            },
        });
    } else {
        res.status(401).json({ success: false });
    }
});

// React //


module.exports = route