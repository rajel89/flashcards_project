const connectDB = require('./startup/db');
const express = requrie('express');
const app = express();

connectDB ();


app.use (express.json());

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server Start on Port: ${port}`);
});




 

