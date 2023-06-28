import Image from 'next/image';
import styles from './page.module.css';
import BlogCard from '@/components/ui/blogCard/BlogCard';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))} */}
      </div>
    </div>
  );
}
