import crypto from 'crypto'
import prisma from '../prisma'

export const createUser = async ({ username, password }) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

  const newUser = await prisma.user.create({
    data: {
      username,
      hash,
      salt,
    },
  })

  return newUser
}

// Here you should lookup the user in your DB
export const findUser = async ({ username }) => {
  const users = await prisma.user.findUnique({ where: { username } })

  return users
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex')
  const passwordsMatch = user.hash === inputHash

  return passwordsMatch
}
