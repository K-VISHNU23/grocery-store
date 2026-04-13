const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// 🔥 ADD THIS
require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

app.get("/", (req, res) => {
  res.json({ message: "FreshCart API Running 🛒" });
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});