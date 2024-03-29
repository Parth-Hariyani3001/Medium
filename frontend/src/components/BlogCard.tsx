import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Circle from "./Circle";

interface BlogCardProps {
  authorName: string | null;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export default function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-300 pb-4 w-screen max-w-screen-lg cursor-pointer">
        <div className="flex">
          <Avatar name={authorName !== null ? authorName : "Anonymous"} />
          <div className="flex justify-center items-center">
            <p className="font-extralight pl-2 text-sm items-center">
              {authorName !== null ? authorName : "Anonymous"}
            </p>
            <div className="text-xs flex justify-center flex-col pl-2">
              <Circle />
            </div>
            <p className="pl-2 font-thin text-slate-500 text-sm">
              {publishedDate}
            </p>
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
        <div className="w-full text-slate-500 text-sm font-thin pt-4">{`${Math.ceil(
          content.length / 100
        )} minute(s) read`}</div>
      </div>
    </Link>
  );
}
