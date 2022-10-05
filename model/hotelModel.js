const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        lowercase : true
    },
    maxPersons : {
        type : Number,
        default : 1,
        validate : value => {
            if (value <= 0){
                throw new Error ('Aucune donner superieure a 0')
            }
        }
    }
})

const hotelModel = mongoose.model('Hotel', hotelSchema)

module.exports = hotelModel