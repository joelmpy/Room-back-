const express = require('express');
const route = express.Router()
const {  getHotelOne, 
         getHotelALL,
         postHotel,
         patchHotel,
         deleteHotel} = require('../controllers/hotelControllers')

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


module.exports = route