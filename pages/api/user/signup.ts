import { NextApiRequest, NextApiResponse } from 'next'
import { createUser } from '../../../lib/user'

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await createUser(req.body)

    res.status(200).send({ done: true })
  } catch (error) {
    res.status(500).end(error.message)
  }
}

export default signup
