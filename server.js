const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const port = process.env.PORT || 3000;

const errorHandler = require('./middleware/errorhandler');
const Contacts = require('./models/contactModel');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MyContacts');
  console.log('Db Connected');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public/CSS")));

app.get('/api/contacts/new', (req, res)=>{
  res.render("UI/new.ejs");
});

app.get('/api/contacts/:id/edit', async (req, res)=>{
  let {id} = req.params;
  const oneContact = await Contacts.findById(id);
  res.render('UI/edit.ejs',{oneContact});
});

app.use(methodOverride('_method'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use(errorHandler);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, (req, res) => {
    console.log(`app listening ${port}`);
});