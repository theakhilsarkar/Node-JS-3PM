import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import { Auth } from '../models/AuthModels.js'

// signin
// user find
// user password
// sign success

const localStrategy = new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {

        const user = await Auth.findOne({ email });
        if (!user) {
            return done(null, false, { message: "user not found !" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: "password is incorrect !" });
        }

        return done(null, user, { message: "signin successfull !" });
    } catch (err) {
        return done(err.message, false, { message: "signin failed " });
    }
});

passport.use(localStrategy);

// cookie - expiry 
// session - tab close

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    const user = await Auth.findById(id);
    done(null, user);
})