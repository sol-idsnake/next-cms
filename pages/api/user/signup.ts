import { NextApiRequest, NextApiResponse } from 'next'
import { sendEmailConfirmation } from '../../../lib/mail'
import { createUser } from '../../../lib/user'

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, emailToken } = await createUser(req.body)
    await sendEmailConfirmation(email, emailToken)

    res.status(200).send({ done: true })
  } catch (error) {
    res.status(500).end(error.message)
  }
}

export default signup
