import { Schema } from 'mongoose';
import { StaticImageData } from 'next/image';

type Blog = {
  id: number;
  title: string;
  desc: string;
  img: StaticImageData;
  authorId: string;
};

interface IUser {
  username: string;
  email: string;
  password: string;
  blogs: Blog[];
}
interface IBlog {
  title: string;
  desc: string;
  category: string;
  imageURL: StaticImageData;
  authorId: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId;
}

interface IComment {
  blogId: Schema.Types.ObjectId;
  authorId: Schema.Types.ObjectId;
  text: string;
}
