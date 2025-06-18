const express = require("express");
const app = express();
const dotenv = require("dotenv");
const recipeRoute = require("./routes/recipeRoutes");
const authRoute = require("./routes/authRoutes");
const connectDB = require("./dbconfig/connectdb");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
dotenv.config();

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
  })
);

//Routes
app.use("/api/recipes", recipeRoute);
app.use("/api/auth", authRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
  });
}

//Start Server + Connect DB
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
