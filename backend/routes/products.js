const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Apple", price: 100 },
    { id: 2, name: "Banana", price: 50 }
  ]);
});

module.exports = router;