import { NextApiRequest, NextApiResponse } from 'next'
import { getLoginSession } from '../../../lib/auth'
import { updateUser, User } from '../../../lib/user'

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getLoginSession(req)
    const userUpdate = (session && (await updateUser(session as User, req.body))) ?? null

    res.status(200).json({ userUpdate })
  } catch (error) {
    res.status(500).end('Update failed')
  }
}

export default update
