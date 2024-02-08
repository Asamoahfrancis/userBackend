import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CommentsModal } from "./CommentsModel";
interface userType extends Document {
  username: string;
  password: string;
  tokens: { token: string }[];
  generateToken(): Promise<string>;
  getPublicProfile(): Promise<any>;
  avatar: any;
}

interface modalType extends Model<userType> {
  getUsercredentials(
    username: string,
    password: string
  ): Promise<userType | null>;
}
const UserSchema = new Schema<userType>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const userData = this;

  if (userData.isModified("password")) {
    userData.password = await bcrypt.hash(userData.password, 8);
  }
  next();
});

UserSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const user = this;
    const commentModal = await CommentsModal.deleteMany({ owner: user._id });
    if (!commentModal) {
      next(new Error("failed to remove the comment data"));
    }
    next();
  }
);

UserSchema.methods.generateToken = async function () {
  const userData = this;
  try {
    const token = jwt.sign({ _id: userData._id }, "thisismySecrete");
    userData.tokens = userData.tokens.concat({ token: token });
    await userData.save();

    return token;
  } catch (error) {
    console.log({ Error: error });
  }
};

UserSchema.statics.getUsercredentials = async function (username, password) {
  const userData = await userModal.findOne({ username: username });
  if (!userData) throw new Error("no user data found");

  const isMatch = await bcrypt.compare(password, userData.password);
  if (!isMatch) {
    throw new Error("username or password error");
  }
  return userData;
};

UserSchema.methods.toJSON = function () {
  const rawUser = this;
  const userData = rawUser.toObject();
  delete userData.password;
  delete userData.tokens;
  return userData;
};

export const userModal = mongoose.model<userType>(
  "users",
  UserSchema,
  "users"
) as modalType;
