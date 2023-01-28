// import Express.
var cors = require("cors");
const path = require('path');

const express = require('express');
const fs = require('fs') ;

const app = express();

// It allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.


const morgan = require('morgan');

const accessLogStream 
= fs.createWriteStream(path.join(__dirname, 'access.log'),
{flags : 'a'});

// Impoet helmet
const helmet=require('helmet')
app.use(helmet())

app.use(morgan('combined' , {stream : accessLogStream}))
// Import env
require('dotenv').config();

// It provides four express middleware for parsing JSON, Text, URL-encoded, and raw data sets over an HTTP request body.
const bodyParser = require('body-parser');
// The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// Relation
const User = require('./models/users');
const Expense = require('./models/expense');
const Forgotpassword = require('./models/forgotPassword');
// Import
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes')
const resetPasswordRoutes = require('./routes/resetPassword')
const Order = require('./models/orders');
// This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparser.
const dotenv = require('dotenv');

// get config vars
dotenv.config();
app.use(cors());
app.use(express.json());


// use routes '/user' automatically add 'user' before link.
app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/password', resetPasswordRoutes);


app.use((req ,res)=>{
  console.log('url' , req.url)
  res.sendFile(path.join(__dirname,`frontend/${req.url}`));
});

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);



// if database sync then start the server.
const sequelize = require('./util/database');
sequelize

 .sync({ force: true })
  //.sync()
  // sync() is used to synchronize your Sequelize model with your database tables.
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(err);
  });