import mongoose from "mongoose";

const connectDB = async () => {
   try {
      const connection = await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to DB", connection.connection.host);
   } catch (error) {
      console.log("Error connecting to DB", error);
      process.exit(1);
   }
};

export default connectDB;
