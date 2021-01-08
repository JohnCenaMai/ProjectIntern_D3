import GoogleStrategy from "passport-google-oauth";
import authConfig from "./authConfig.js";
import User from "./../models/User.js";
import connection from "./../server.js";

const googleStrategy = GoogleStrategy.OAuth2Strategy;

export default function (passport) {
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user[0].id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    new User(connection).getOne(`id = ${id}`, (err, result) => {
      done(err, result);
    });
  });

  passport.use(
    new googleStrategy(
      {
        clientID: authConfig.googleAuth.clientID,
        clientSecret: authConfig.googleAuth.clientSecret,
        callbackURL: authConfig.googleAuth.callbackURL,
      },
      function (token, tokenSecret, profile, done) {
        //   Do something here
        const user = new User(connection);

        user.getOne(`email = "${profile.emails[0].value}"`, (err, result) => {
          if (err) console.log(err);

          if (result != null) {
            const data = {
              username: profile.displayName,
              imageUrl: profile.photos[0].value,
              email: profile.emails[0].value,
              status: 0,
            };

            user.createOne(data, (err, result) => {
              return user.getOne(
                `email = "${profile.emails[0].value}"`,
                (err, result) => {
                  done(null, result);
                }
              );
            });
          }
        });
      }
    )
  );
}
