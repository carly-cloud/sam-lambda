import { Request, Response } from 'express'

export class HealthController {
  static index = (req: Request, res: Response) => {
    res.success({ success: true })
  }
}
