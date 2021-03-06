import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import passport from 'passport'
import { setLoginSession } from '../../../lib/auth'
import localStrategy from '../../../lib/password-local'
import { User } from '.prisma/client'

const authenticate = (method: string, req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

passport.use(localStrategy)

export default nextConnect()
  .use(passport.initialize())
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const user = await authenticate('local', req, res)
      // session is the payload to save in the token, it contains basic info about the user
      const session = { ...(user as User) }

      await setLoginSession(res, session)

      res.status(200).send({ done: true })
    } catch (error) {
      res.status(401).send(error.message)
    }
  })
