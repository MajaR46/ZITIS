const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const webpushHandler = require("./webpushconfig/webpushHandler");

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

app.post("/register-subscription", webpushHandler.registerSubscription);
app.post("/send-notification", webpushHandler.sendNotification);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
