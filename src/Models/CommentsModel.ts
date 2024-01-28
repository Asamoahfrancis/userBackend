import mongoose, { Document, Model, Schema } from "mongoose";
interface commentType extends Document {
  comment: string;
  owner: any;
}

interface commentModalType extends Model<commentType> {
  getComments(arg: any): Promise<commentType | null>;
}
const CommentSchema = new Schema<commentType>({
  comment: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export const CommentsModal = mongoose.model<commentType>(
  "Comments",
  CommentSchema,
  "comments"
) as commentModalType;
