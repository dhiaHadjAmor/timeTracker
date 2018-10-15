import express from 'express'
const router = express.Router()
import { create, get } from '../components/task/taskController'

  router.get('/tasks', get)
  router.post('/task', create)


export default router
