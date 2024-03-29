import AppBar from "./AppBar";
import { Blog } from "../hooks/useBlog";
import Avatar from "./Avatar";

export default function FullBlog({ blog }: { blog: Blog }) {
  const { title, content, author } = blog;
  console.log(title);
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-2-screen-xl pt-12">
          <div className="col-span-8 ">
            <div className="text-5xl font-extrabold">{title}</div>
            <div className="text-slate-500 pt-2">
              Posted on 2nd December 2023
            </div>
            <div className="pt-4">{content}</div>
          </div>
          <div className="col-span-4 ">
            <div className="text-slate-500 text-lg">Author </div>
            <div className="flex w-full">
              <div className="pr-6 flex items-center">
                <Avatar
                  name={author.name !== null ? author.name : "Anonymous"}
                  size={10}
                />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {author.name !== null ? author.name : "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to grab user's
                  attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
