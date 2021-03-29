import crypto from 'crypto'
import prisma from '../prisma'

export type User = {
  id: string
  username: string
  hash: string
  salt: string
  email: string | null
  createdAt: Date
  updatedAt: Date
}

export const createUser = async ({ username, password }) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

  const newUser: User = await prisma.user.create({
    data: {
      username,
      hash,
      salt,
    },
  })

  return newUser
}

// Here you should lookup the user in your DB
export const findUser = async (session: User) => {
  const { username } = session
  const user = await prisma.user.findUnique({ where: { username } })

  return user
}

export const updateUser = async (session: User, update: User) => {
  const { id, email } = session

  // Is it safe to update via ...update or better to update property by property to not allow for malicious hash/salt update?
  if (email !== update.email) {
    const emailUpdate = await prisma.user.update({
      where: { id },
      data: {
        email: update.email,
      },
    })

    return emailUpdate
  }

  return 'Update failed'
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export const validatePassword = (user: User, inputPassword: string) => {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex')

  return user.hash === inputHash
}
