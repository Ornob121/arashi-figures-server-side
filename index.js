const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// ! MiddleWares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("The Arashi Figures server is running");
});

app.listen(port, () => {
  console.log("THis server is running on PORT:", port);
});
