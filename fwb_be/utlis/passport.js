import GoogleStrategy from "passport-google-oauth";

const googleStrategy = GoogleStrategy.OAuth2Strategy;

export default function (passport) {
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        consumerKey: process.env.GOOGLE_CLIENT_ID,
        consumerSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      function (token, tokenSecret, profile, done) {
        //   Do something here
      }
    )
  );
}
