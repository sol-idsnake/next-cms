import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import prisma from '../prisma'

// const users = []

export const createUser = async ({ username, password }) => {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  // const user = {
  //   id: uuidv4(),
  //   createdAt: Date.now(),
  //   username,
  //   hash,
  //   salt,
  // }
  console.log(username, 'username')
  console.log(password, 'password')
  console.log(salt, 'salt')
  console.log(hash, 'hash')

  const newUser = prisma.user.create({
    data: {
      username,
      password,
    },
  })

  // This is an in memory store for users, there is no data persistence without a proper DB
  // users.push(user)

  // return { username, createdAt: Date.now() }
  return newUser
}

// Here you should lookup for the user in your DB
export const findUser = async ({ username }) => {
  // This is an in memory store for users, there is no data persistence without a proper DB
  const users = prisma.user.findUnique({ where: { id: username } })
  //   return users.find((user) => user.username === username)
  return users
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}
