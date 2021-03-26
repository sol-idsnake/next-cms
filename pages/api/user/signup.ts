import { createUser } from '../../../lib/user'

const signup = async (req, res) => {
  try {
    await createUser(req.body)
    res.status(200).send({ done: true })
  } catch (error) {
    console.error(error)
    res.status(500).end(error.message)
  }
}

export default signup
