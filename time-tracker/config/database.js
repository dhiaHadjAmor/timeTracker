import mongoose from 'mongoose';
const url = 'mongodb://mongo:27017/tracker'

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});