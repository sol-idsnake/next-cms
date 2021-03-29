import Local from 'passport-local'
import { findUser, validatePassword } from './user'

const localStrategy = new Local.Strategy(function strategy(username, password, done) {
  findUser({ username })
    .then((user) => {
      if (user && validatePassword(user, password)) {
        done(null, user)
      } else {
        done(new Error('Invalid username and password combination'))
      }
    })
    .catch((error) => {
      done(error)
    })
})

export default localStrategy
