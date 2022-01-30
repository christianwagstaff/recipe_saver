import { NextApiRequest, NextApiResponse } from 'next'
import ResponseFuncs from '../../../utils/types'
import { connect } from '../../../middleware/mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // capture request method, we type it as key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  // Catch Errors Func
  const errorCatcher = (error: Error) => res.status(400).json({ error })

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // Response for GET requests
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { RecipeModel } = await connect()
      res.json(await RecipeModel.find({}).catch(errorCatcher))
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { RecipeModel } = await connect()
      res.json(await RecipeModel.create(req.body).catch(errorCatcher))
    },
  }

  // Check if there is a response for the particular method, if so invoke it, else respond with error
  const response = handleCase[method]
  if (response) {
    return response(req, res)
  } else {
    return res.status(400).json({ error: 'No Response for this request' })
  }
}

export default handler
