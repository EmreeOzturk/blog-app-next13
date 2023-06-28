import { StaticImageData } from 'next/image';

type Blog = {
  id: number;
  title: string;
  desc: string;
  img: StaticImageData;
  authorId: string;
};
