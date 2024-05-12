const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use('/api/contacts', require('./routes/contactroute'));

app.listen(port,(req,res)=>{
    console.log(`server running on ${port}`);
});
// To be continued.