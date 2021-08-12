const connectDB = require("./startup/db");
const express = require("express");

const app = express();
const decks = require("./routes/decks");

connectDB();

app.use(express.json());
app.use("/api/decks", decks);

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server Start on Port: ${port}`);
});
