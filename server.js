const express = require('express');
const errorhandler = require('./middleware/errorhandler');
const dotenv = require('dotenv').config();
const app = express();

const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mycontacts-backend');
}

const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/contacts', require("./routes/contactroute"));
app.use(errorhandler);

app.listen(port,(req,res)=>{
    console.log(`server running on ${port}`);
});