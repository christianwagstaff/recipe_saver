import { NextApiRequest, NextApiResponse } from 'next'

type ResponseFunc = (req: NextApiRequest, res: NextApiResponse) => void

// Interface to defining our object of response functions
export default interface ResponseFuncs {
  GET?: ResponseFunc
  POST?: ResponseFunc
  PUT?: ResponseFunc
  DELETE?: ResponseFunc
}
