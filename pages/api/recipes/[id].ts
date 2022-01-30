import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../middleware/mongodb'
import ResponseFuncs from '../../../utils/types'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // capture resquest method
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  // Error catcher function
  const errorCatcher = (error: Error) => res.status(400).json({ error })

  // Get ID from req.query
  const id: string = req.query.id as string

  // Potential responses for /recipes/:id
  const handleCase: ResponseFuncs = {
    // Response for GET
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { RecipeModel } = await connect()
      res.json(await RecipeModel.findById(id).catch(errorCatcher))
    },
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      const { RecipeModel } = await connect()
      res.json(
        await RecipeModel.findByIdAndUpdate(id, req.body, { new: true }).catch(
          errorCatcher
        )
      )
    },
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      const { RecipeModel } = await connect()
      res.json(await RecipeModel.findByIdAndDelete(id).catch(errorCatcher))
    },
  }

  // Check if there is a response for the method, if so invoke it
  const response = handleCase[method]
  if (response) {
    return response(req, res)
  } else {
    return res.status(400).json({ error: 'No response for this request' })
  }
}

export default handler
