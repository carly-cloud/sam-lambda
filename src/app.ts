import * as Sentry from '@sentry/serverless'
import bodyParser from 'body-parser'
import express from 'express'
import { engine } from 'express-handlebars'

import routes from './routes'

export class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.initializeMiddlewares()
  }

  getExpressApp() {
    return this.app
  }

  private initializeMiddlewares() {
    this.app.use(express.static('public'))

    // RequestHandler creates a separate execution context using domains, so that every
    // transaction/span/breadcrumb is attached to its own Hub instance
    this.app.use(Sentry.Handlers.requestHandler() as express.RequestHandler)

    // TracingHandler creates a trace for every incoming request
    this.app.use(Sentry.Handlers.tracingHandler())

    this.app.engine(
      'hbs',
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      engine({
        extname: 'hbs',
        defaultLayout: 'main'
      })
    )
    this.app.set('view engine', 'hbs')
    this.app.use(bodyParser.raw())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))

    this.initializeRoutes()

    // The error handler must be before any other error middleware and after all controllers
    this.app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler)
  }

  private initializeRoutes() {
    // The aws-serverless-express library creates a server and listens on a Unix
    // Domain Socket for you, so you can remove the usual call to this.app.listen.
    // this.app.listen(3000)
    this.app.use('/', routes)
  }
}
