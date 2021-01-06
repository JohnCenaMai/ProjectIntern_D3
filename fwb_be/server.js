import dotenv from "dotenv";
import mysql from "mysql";
import app from "./app.js";

// Config the config file
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 5000;

// Connect to database
const connection = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
});

// Check whether conecting to db was success or not
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB connected!");
  }
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

export default connection;
