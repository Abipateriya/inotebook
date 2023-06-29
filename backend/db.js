
const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook"
// const connectTOMongo=()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("connected")
//     })
// }

const connectTOMongo=()=>{
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true } )

.then(() => console.log('Connected Successfully'))

.catch((err) => { console.error(err); });
}
module.exports=connectTOMongo ;