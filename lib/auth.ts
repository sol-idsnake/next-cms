import Iron from '@hapi/iron'
import { NextApiRequest, NextApiResponse } from 'next'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies'
import { User } from '.prisma/client'

const { TOKEN_SECRET } = process.env

export const setLoginSession = async (res: NextApiResponse, session: User) => {
  const createdAt = Date.now()

  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE }
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

  setTokenCookie(res, token)
}

export const getLoginSession = async (req: NextApiRequest): Promise<boolean | User> => {
  const token = getTokenCookie(req)

  if (!token) return false

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
  const expiresAt = session.createdAt + session.maxAge * 1000

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired')
  }

  return session
}
