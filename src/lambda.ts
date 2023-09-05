/* istanbul ignore file */

import serverlessExpress from '@vendia/serverless-express'
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Handler,
} from 'aws-lambda'
import express from 'express'

import { App } from './app'

type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>

// global variable server to keep hot in lambda
// server is set at the first call and reused then
let server: ProxyHandler

export const handler: ProxyHandler = (event, context, callback) => {
  if (server) {
    return server(event, context, callback)
  }

  const app: express.Application = new App().getExpressApp()

  server = serverlessExpress({ app })

  return server(event, context, callback)
}
