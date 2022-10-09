const passport = require('passport');
const LocalStrategy = require('passport-local')

const UserModel = require('../model/userModel');

passport.use(
    'signup',
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, async (email, password, done) => {
        try {
            const user = await UserModel.create({ email, password })
            return done(null, user) // null veut dire que je lui passe aucune erreur et que je lui passe le user

        } catch (error) {
            return done(error)
        }

    })
)

passport.use(
    'login',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email })
                // je verife si il y a un utilsateur sauvgarder ou pas//
                if (!user) {
                    return done(null, false, { message: "Utilsateur non trouvé" })
                }
                // je verife si le mots de passe est bon ou pas
                const validate = await user.isValidPassword( password )
                if(!validate){
                    return done(null, false, {message: 'Error de connexion'})
                }

                // je return si tout est bon l'user avce la conexion reussi 
                return done(null, user, { message: 'Connexion reussi' })

            } 
            catch (error) {
                return done(error)
            }
        })
)



module.exports = passport