import express from 'express'
const router = express.Router();

router.post('/', function(req, res) {
  console.log('users/')
  res.send('you reached / ')
})

router.post('/signin', function(req, res) {
  console.log('users/signin')
  res.send({ username: 'joe', password: 'xyz' })
})
module.exports = router
