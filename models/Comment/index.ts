//comment schema

import { Schema, model, models } from 'mongoose';
import { IComment } from '@/types';

const CommentSchema: Schema<IComment> = new Schema(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default models?.Comment || model<IComment>('Comment', CommentSchema);
