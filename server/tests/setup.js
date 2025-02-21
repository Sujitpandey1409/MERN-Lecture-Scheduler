import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

before(async function () {
  this.timeout(5000); // Increase timeout for DB connection
  await mongoose.connect(process.env.MONGO_URI);
});

after(async function () {
  await mongoose.connection.close();
});
