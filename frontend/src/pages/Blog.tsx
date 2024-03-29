import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks/useBlog";
import AppBar from "../components/AppBar";

export default function Blog() {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id || "" });

  console.log(blog);

  if (loading) {
    return (
      <>
        <div>
          <AppBar />
        </div>
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      </>
    );
  }

  if (!blog) {
    return <div>No blog found</div>;
  }

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
}
