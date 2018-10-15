import _ from 'lodash'
import Task from './task.js'

export async function get(req, res) {
  try {

    const tasks = await Task.find({}).sort('date')

    return res.json({ tasks })

  } catch (error) {

    console.log(error)
    return res.status(500).end()
  }
}

export async function create(req, res) {
  try {

    if (!(req.body.description && req.body.date && req.body.duration))
      return res.status(400).end()

    let newTask = await Task.create(req.body)
    return res.json({ newTask })

  } catch (error) {

    console.log(error)
    return res.status(500).end()
  }
}
