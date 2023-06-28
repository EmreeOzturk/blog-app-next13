import React from 'react';
import styles from './BlogCard.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.imgContainer} href={`/`}>
          <Image src={blog.img} width={350} height={350} alt="blog" />
        </Link>
        <div className={styles.blogData}>
          <div className={styles.left}>
            <h3>{blog.title}</h3>
            <p>{blog.desc}</p>
          </div>
          <div className={styles.right}>
            12 {isLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
