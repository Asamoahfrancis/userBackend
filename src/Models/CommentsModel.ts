import mongoose, { Document, Model, Schema } from "mongoose";

interface commentType extends Document {
  comment: string;
}

interface commentModalType extends Model<commentType> {
  getComments(arg: any): Promise<commentType | null>;
}
const CommentSchema = new Schema<commentType>({
  comment: {
    type: String,
    required: true,
  },
});

CommentSchema.statics.getComments = async function (params: any) {
  try {
  } catch (error) {}
};

export const CommentsModal = mongoose.model<commentType>(
  "Comments",
  CommentSchema,
  "comments"
) as commentModalType;
