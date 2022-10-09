const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
        email : {
            type : String,
            required : true,
            unique : true,
        },
        password : {
            type : String,
            required : true
        }
})

// Avant d'enregeitrer dans Mongo //

UserSchema.pre('save', async function (next) {
    const user = this
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
    next()
})

// Ajouter une methode pour verifer passaword et le valider //

UserSchema.methods.isValidPassword = async function (password) {
    const user = this 
    // compare le mots passe avec le user
    const isSame = await bcrypt.compare(password, user)
    return isSame // return true ou false
}

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel