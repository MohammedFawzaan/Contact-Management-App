const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

const errorHandler = require('./middleware/errorhandler');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MyContacts');
  console.log('Db Connected');
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));

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