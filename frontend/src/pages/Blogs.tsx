import BlogCard from "../components/BlogCard";
import AppBar from "../components/AppBar";
import Skeleton from "../components/Skeleton";
import { useBlogs } from "../hooks/useBlogs";

export default function Blogs() {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <>
        <AppBar />
        <div className="flex justify-center flex-col items-center w-full">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </>
    );
  }
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div>
          {blogs.map((blog) => {
            return (
              <div key={blog.id}>
                <BlogCard
                  id={blog.id}
                  authorName={blog.author.name}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={"2nd Feb 2024"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
