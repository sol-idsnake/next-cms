import crypto from 'crypto'
import { NextApiRequest } from 'next'
import prisma from '../prisma'
import { User } from '.prisma/client'

export const createUser = async ({
  username,
  password,
  email,
}: {
  username: string
  password: string
  email: string
}) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

  const newUser: User = await prisma.user.create({
    data: {
      email,
      hash,
      salt,
      username,
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

export const updateUser = async (req: NextApiRequest) => {
  if (req.query.email && req.query.token) {
    const { email } = req.query

    const emailConfirmation = prisma.user.update({
      where: { email },
      data: {
        emailConfirmed: true,
        emailToken: '',
      },
    })

    return emailConfirmation
  }

  // Is it safe to update via ...update or better to update property by property to not allow for malicious hash/salt update?
  // if (email !== payload.email) {
  //   const emailUpdate = await prisma.user.update({
  //     where: { id },
  //     data: {
  //       email: payload.email,
  //     },
  //   })

  //   return emailUpdate
  // }

  return 'Update failed'
}
