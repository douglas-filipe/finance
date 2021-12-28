import "reflect-metadata";
import "./src/database";
import express from "express";
import userRoute from "./src/routes/userRoute";
import revenueRoute from "./src/routes/revenueRoute";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hi!!");
});

app.use("/users", userRoute);
app.use("/revenue", revenueRoute);

app.listen(3000, () => console.log("Server is running"));
