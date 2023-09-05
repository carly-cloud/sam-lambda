import express from 'express'

import { CarCheckController } from '../controllers/car-check.controller'
import { HealthController } from '../controllers/health.controller'

const routes = express.Router()

routes.get('/health', HealthController.index)
routes.get('/car-check', CarCheckController.index)

export default routes
