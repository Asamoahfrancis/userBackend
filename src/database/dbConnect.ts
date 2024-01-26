import mongoose from "mongoose";
import { z } from "zod";
require("dotenv").config();
const envVariables = z.object({
  MONGODB_URI: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

export const dbConnection = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("connected"));
    mongoose.connection.on("open", () => console.log("open"));

    mongoose.connect(process.env.MONGODB_URI);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const closeDatabaseConnection = async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
};

// mongoose.connection.on("disconnected", () => console.log("disconnected"));
// mongoose.connection.on("reconnected", () => console.log("reconnected"));
// mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
// mongoose.connection.on("close", () => console.log("close"));

// await mongoose.connect("mongodb://127.0.0.1:27017/UserPost");
// await mongoose.connect(
//   "mongodb+srv://francis:MLotjg2aacfctXNU@cluster0.zwetr17.mongodb.net/usersTable?retryWrites=true&w=majority"
// );
