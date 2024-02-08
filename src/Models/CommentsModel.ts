import mongoose, { Document, Model, Schema } from "mongoose";
interface commentType extends Document {
  comment: string;
  owner: any;
  completed: boolean;
}

interface commentModalType extends Model<commentType> {
  getComments(arg: any): Promise<commentType | null>;
}
const CommentSchema = new Schema<commentType>(
  {
    comment: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    completed: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export const CommentsModal = mongoose.model<commentType>(
  "Comments",
  CommentSchema,
  "comments"
) as commentModalType;
