const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
var cors = require("cors");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(cors());


const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//Route imports

const property = require("./routes/propertyRoutes");
app.use("/api/v1/property", property);

const user = require("./routes/userRoutes");
app.use("/api/v1/user", user);

const category = require("./routes/categoryRoutes");
app.use("/api/v1/category", category);

const superCategory = require("./routes/superCategoryRoutes");
app.use("/api/v1/supercategory", superCategory);

const subCategory = require("./routes/subCategoryRoutes");
app.use("/api/v1/subcategory", subCategory);

const commertial = require("./routes/CommertialRoutes");
app.use("/api/v1/commertial", commertial);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
