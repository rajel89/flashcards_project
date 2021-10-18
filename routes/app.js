var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
let cors = require('cors');
dotenv.config()

const cardRoouter = require("./routes/card")

mongoose.connect("mongodb+srv://new-user-01:YSx371pVxKIbHNnb@cluster0.2jmzi.mongodb.net/deck_of_cards?retryWrites=true&w=majority",
 {useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log('error =>', err.message));


const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/cards",cardRoouter)
const port = process.env.PORT || 4000
app.listen(port,()=>console.log('running on port... ', port))
