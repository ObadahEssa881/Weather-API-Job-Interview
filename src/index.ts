import express = require("express");
require("dotenv").config();
import morgan = require("morgan");
import weatherRouter from "./routes/weatherRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => res.send("API running ✅"));

app.use("/api/weather", weatherRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
