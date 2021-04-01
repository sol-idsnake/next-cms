import { NextApiRequest, NextApiResponse } from 'next'
import { updateUser } from '../../../lib/user'

const confirmEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await updateUser(req)

    res.status(200).json({ done: true })
  } catch (error) {
    res.status(500).end('Email confirmation failed')
  }
}

export default confirmEmail
