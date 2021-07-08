const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const port=8000;
const app= express();
const User = require('./models/User');

app.use(bodyParser.json());

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})

mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/userData', { useNewUrlParser: true })


function sendResponse(err, res, data){
  if(err){
    res.json({success: false, message: err})
  } else if (!data){
    res.json({sucess: false, message: "Not Found"})
  } else {
    res.json({sucess: true, data: data})
  }
}

// CREATE
app.post('/users',(req,res)=>{
  User.create(
    {...req.body.newData},
    (err, data)=>{sendResponse(err, res, data)}
  )
})

app.route('/users/:id')
// READ
.get((req,res)=>{
  User.findById(req.params.id,(err,data)=>{sendResponse(err, res, data)})
})
// UPDATE
.put((req,res)=>{
  User.findByIdAndUpdate(
    req.params.id,
    {...req.body.newData},
    {
      new: true
    },
    (err, data) => {sendResponse(err, res, data)}
  )
})
// DELETE
.delete((req,res)=>{
  User.findByIdAndDelete(
    req.params.id,
    (err,data)=>{sendResponse(err, res, data)}
  )
})