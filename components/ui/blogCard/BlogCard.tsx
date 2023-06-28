'use client';
import { useState } from 'react';
import styles from './BlogCard.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { Blog } from '@/types';
const BlogCard: React.FC<Blog> = ({ id, title, desc, img }) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.imgContainer} href={`/`}>
          <Image src={img} width={350} height={350} alt="blog" />
        </Link>
        <div className={styles.blogData}>
          <div className={styles.left}>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
          <div className={styles.right}>
            12{' '}
            {isLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
