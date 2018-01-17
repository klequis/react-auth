import express from 'express'
const router = express.Router();

router.get('/register', (req, res) => {
  
  /* final code needs mod
  const username = req.body.username;
  const password = req.body.password;
  bcrypt.hash(password, 10).then((hash) => {
    console.log('** hash **', hash)
    connection.query("INSERT INTO tbl_users SET ?", {username: username, password: hash, full_Name: username})
  })
  */
  res.send({
    "route": "get('/register')",
    "result": "good",
  })
})
router.post('/register', (req, res) => {
  console.log('users/register')
  res.send(JSON.stringify({
    route: "post('/register')",
    result: 'good',
  }))
})
router.post('/signin', function(req, res) {
  console.log('users/signin')
  res.send(JSON.stringify({
    route: "post('/signin')",
    result: 'good',
  }))
})
router.get('/logout', (req, res) => {
  // req.session.destroy();
  //req.logout();
  // res.redirect('/');
  console.log('users/logout')
  res.send(JSON.stringify({
    route: "get('/logout')",
    result: 'good',
  }))
});
module.exports = router
