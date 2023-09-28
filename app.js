const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./config/db");

const userRoutes = require("./Routes/userRoutes");
const RegisterLoginRoutes = require("./Routes/RegisterLoginRoutes");

const cors=require("cors")

connectDB();

app.use(cors())
app.use(express.json())

app.use(userRoutes);
app.use(RegisterLoginRoutes);



app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});