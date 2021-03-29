import { NextApiRequest, NextApiResponse } from 'next'
import { getLoginSession } from '../../../lib/auth'
import { findUser, User } from '../../../lib/user'

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getLoginSession(req)
    const currentUser = (session && (await findUser(session as User))) ?? null

    res.status(200).json({ currentUser })
  } catch (error) {
    res.status(500).end('Authentication token is invalid, please log in')
  }
}

export default user
