//blog schema

import { IBlog } from '@/types';
import { Schema, model, models } from 'mongoose';

const BlogSchema: Schema<IBlog> = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    desc: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
    },
    imageURL: {
      type: String,
      required: false,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Nature', 'Mountain', 'Beach', 'Forest', 'Village', 'Ocean'],
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export default models?.Blog || model<IBlog>('Blog', BlogSchema);
