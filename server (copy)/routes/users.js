import express from 'express';
import passport from '../passport';
import bcrypt from 'bcrypt';
import { db } from '../db'

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/register', (req, res) => {
  const username = req.body.user.username;
  const password = req.body.user.password;
  console.log(`post/register username=${username}, password=${password}` )
  const sql = 'INSERT INTO tbl_users SET ?'
  bcrypt.hash(password, 10)
    .then((hash) => {
      db()
        .then((conn) => {
          return conn.query(sql, {username: username, password: hash, full_Name: username})
            .then((rows) => {
              res.send(rows)
            })
        })
        .catch((err) => {
          console.log('err', err)
          res.send(err)
        })
    })
    .catch((err) => {
      console.log('err', err)
      res.send(err)
    })
})

router.post('/signin', (req, res, next) => {
  console.log('****  /users/sigin', user)
  res.send('signin')
  // user = req.body.user
  // passport.authenticate('local', (err, user, info) => {
  //   if (err) {
  //     console.log('err1', err)
  //     return next(err);
  //   }
  //
  //   if (!user) {
  //     console.log('user not found')
  //     return res.send('login-failed')
  //   }
  //
  //   req.logIn(user, function(err) {
  //     if (err) {
  //       console.log('unknown signin error')
  //       return next(err);
  //     }
  //     console.log('sigin success')
  //     return res.send(user.username);
  //   });
  // })(req, res, next);
});
// router.post("/signin", passport.authenticate('local', {
//   successRedirect: '/users/success',
//   failureRedirect: '/users/fail',
//   failureFlash: true
// }));
// // , (req, res, info) => {
// //   console.log('** app.post /signin: info **', info)
// //   res.render('login/index', {'message': req.flash('message')});
// // });

// // this didn't work
// router.post('/signin', passport.authenticate('local'),
//   function(req, res) {
//     console.log('** signin success')
//     res.send('success')
//   }
// )





// router.get('/signin', (req, res) => {
//   // console.log('** app.get /signin **')
//   res.render('login', {'message': req.flash('message')});
// });
//


// router.get('/success', (req, res) => {
//   // console.log('** app.get /success **')
//   res.render('success')
// })
// router.get('/fail', (req, res) => {
//   /// console.log('** app.get /fail **')
//   res.render('fail')
// })
// router.get('/logout', (req, res) => {
//   req.session.destroy();
//   req.logout();
//   res.redirect('/');
// });

module.exports = router;
