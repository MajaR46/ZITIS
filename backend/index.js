const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./database/db");

const app = express();
const PORT = process.env.PORT || 3001;
const userRoutes = require("./routes/user");
const reviewRoutes = require("./routes/review");
const jobRoutes = require("./routes/job");
const projectRoutes = require("./routes/project");

app.use(cors());
app.use(express.json());

connectDB();


app.use("/api/user", userRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/project", projectRoutes);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});