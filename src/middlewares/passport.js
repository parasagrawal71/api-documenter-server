const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const UserModel = require("../models/user.model");
const { JWT_SECRET } = require("../config");
const { sendMail } = require("../utils/send-mail");
const { randomNumbers } = require("../utils/functions");
const { verifyEmailTemplate } = require("../email-templates/verify-email");

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        let user = await UserModel.findOne({ email });
        if (user && user.isVerified) {
          return done({ message: "Already registered" });
        }

        const otp = randomNumbers(4);
        const _verifyEmailTemplate = verifyEmailTemplate(email, otp);

        if (user && !user.isVerified) {
          user = await UserModel.findOneAndUpdate({ email }, { otp });
        }

        if (!user) {
          user = await UserModel.create({ email, password, otp });
        }

        const sendMailRes = await sendMail({ to: email, subject: "Verify Your Email", html: _verifyEmailTemplate });
        if (sendMailRes && sendMailRes[0] === false) {
          return done(sendMailRes[1]);
        }

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found", errorCode: "USER_NOT_FOUND" });
        }

        if (user && !user.isVerified) {
          // TODO: SEND MAIL
          return done(null, false, { message: "Account not verified", errorCode: "USER_NOT_VERIFIED" });
        }

        if (user && !user.password) {
          return done(null, false, { message: "Password not set", errorCode: "PASSWORD_NOT_SET" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password", errorCode: "WRONG_PASSWORD" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// passport.use(
//   new JWTstrategy(
//     {
//       secretOrKey: JWT_SECRET,
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("token"),
//     },
//     (token, done) => {
//       try {
//         return done(null, token);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );
