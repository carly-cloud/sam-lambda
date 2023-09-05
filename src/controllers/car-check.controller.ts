import { NextFunction, Request, Response } from 'express'

export class CarCheckController {
  static index = async (req: Request, res: Response, next: NextFunction) => {
    try {

      res.render('test.hbs')
    } catch (error) {
      next(error)
    }
  }
}
