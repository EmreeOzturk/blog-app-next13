import styles from './page.module.css';
import BlogCard from '@/components/ui/blogCard/BlogCard';
import { blogs } from '@/lib/data';
export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            authorId={blog.authorId}
          />
        ))}
        
      </div>
    </div>
  );
}
