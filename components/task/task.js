import mongoose, { Schema } from 'mongoose'

const taskSchema = new Schema(
 {
   description: { type: String },
   date : {type: Date} ,
   duration : {type: Number}
 },
 {
   timestamps: true
 }
)


export default mongoose.model('task', taskSchema)