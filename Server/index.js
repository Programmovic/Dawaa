const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config");

const pharmacyRoutes = require("./routes/pharmacyRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const userRoutes = require("./routes/userRoutes");
//
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDB();

app.use("/pharmacies", pharmacyRoutes);
app.use("/medicines", medicineRoutes);
app.use("/users", userRoutes);

app.listen(3001, () => {
  console.log("Express server listening on port 3001");
});
