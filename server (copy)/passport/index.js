import passport from 'passport'
const LocalStrategy = require('passport-local').Strategy;
import { db } from '../db'
import bcrypt from 'bcrypt'

const strategyOptions = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true, //passback entire req to call back
}
const getUserSQL = "select * from tbl_users where username = ?";

passport.use(new LocalStrategy(strategyOptions, (req, username, password, done) => {
  let db = db()
  db().then((conn) => { }).query(getUserSQL, [username], (err, user) => {
    if (err) {
      // console.log('** error')
      return done(err);
    }
    if (user.length === 0) {
      console.log('** !user')
      return done(null, false);
    }

    let verify = bcrypt.compare(password, user[0].password).then((res) => {
      if (res) {
        // console.log('** passwords match **')
        return done(null, user);
      } else {
        // console.log('** passwords do not match **')
        return done(null, false);
      }
    })
  });
}));

passport.serializeUser((user, done) => {
  // console.log(`** serializeUser: user[0].id=${user[0].id}`)
  done(null, user[0].id);
});

passport.deserializeUser((id, done) => {
  console.log(`** deserializeUser: id=${id}`)
  let sql = `select * from tbl_users where id = ${id}`
  // connection.query(sql, (err, rows) => {
  //   done(err, rows[0]);
  // });
  db()
    .then((conn) => {
      return conn.query(sql)
    })
    .then((result) => {
      done(err, rows[0])
    })
    .catch((err) => {
      console.log('passport.deserializeUser', err)
    })
});

module.exports = passport;
