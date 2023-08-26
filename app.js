const express = require('express')
const mongoose = require("mongoose")
const routes = require('./routes')
require("dotenv").config()

const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(() => {
  console.log("Database connected...")

}).catch(error => {
  console.error("Database connection error:", error)
  process.exit(1); // Exit the process if there's a database connection error
})

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
