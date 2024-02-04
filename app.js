// Requires
const express = require("express");
const songsRoute = require("./routes/song");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); // cors
app.use(express.json()); // Parse request body (used for parsing the request body sent from client/postman request body)

// Base Routing URL
app.use("/api/v1/songs", songsRoute);

// Connect DB and Start server
require("dotenv").config(); // accessing .env variables
const port = process.env.PORT || 3000; // dynamic port setup

const DatabaseConnection = require("./db/connect"); // import Data base connection function
const start = async () => {
  try {
    const connectionURL = process.env.MONGO_URI;
    await DatabaseConnection(connectionURL);
    console.log("Database connected ...");
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start(); // Start the server
