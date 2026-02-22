import app from "./app.js";

// Public or Private Port
const port = process.env.PORT || 3000;

// Start Server
app.listen(port, () => {
  console.log("Server running on port", port);
});

// Live Test
app.get("/", (req, res) => {
  res.send("Brother Your Server Is Working Fine. Congrats!");
});
