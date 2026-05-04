const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const Authroute = require("./routes/authRoutes");
const Ownerroute = require("./routes/farmOwnerRoutes");
const Patidarroute = require("./routes/patidarRoutes");
const Farmroute = require("./routes/farmRoutes");
const Expensesroute = require("./routes/expenseRoutes");
const cors = require('cors');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use("/api/auth",Authroute);
app.use("/api/farm-owner",Ownerroute);
app.use("/api/patidar-data", Patidarroute)
app.use('/api/farms', Farmroute)
app.use('/api/', Expensesroute);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
