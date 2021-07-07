const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const UserModel = require("../models/user.model");
const { JWT_SECRET } = require("../config");
const { sendMail } = require("../utils/send-mail");
const { randomNumbers } = require("../utils/functions");
const { accountVerificationTemplate } = require("../email-templates/account-verification");

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        let user = await UserModel.findOne({ email });
        if (user && user.isVerified) {
          return done({ message: "Already registered: Please login to your account", code: "ALREADY_REGISTERED" });
        }

        const otp = randomNumbers(4);
        const _accountVerificationTemplate = accountVerificationTemplate(email, otp);

        if (user && !user.isVerified) {
          return done({ message: "Account not verified", code: "USER_NOT_VERIFIED" });
        }

        if (!user) {
          user = await UserModel.create({ email, password, otp });
        }

        const sendMailRes = await sendMail({
          to: email,
          subject: "Account Verification",
          html: _accountVerificationTemplate,
        });
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
  new LocalStrategy(
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
