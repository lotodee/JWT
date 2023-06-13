const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes")
const app = express();
const dotenv = require("dotenv")
const cookieRoute = require('./routes/cookieRoutes')
// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())
dotenv.config()
// view engine
app.set('view engine', 'ejs');
const port =process.env.PORT || 3000


// database connection
const dbURI = 'mongodb+srv://lotoDEE:malcomx0147@cluster0.xs1zhyd.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(port, ()=>{
    console.log(` connected to mongoDB and listening on port ${port}`)
  }))
  .catch((err) => console.log(err));
// app.listen(3000, ()=>{
//   console.log(` connected to mongoDB and listening on port 3000`)})
// routes

app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes)

app.use(cookieRoute)
