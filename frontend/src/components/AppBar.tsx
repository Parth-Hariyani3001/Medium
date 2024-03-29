import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export default function AppBar() {
  return (
    <div className="border-b flex justify-between px-10 py-5">
      <div className="text-lg font-bold flex items-center cursor-pointer">
        <Link to="/blogs">Medium</Link>
      </div>
      <div>
        <Link to="/publish">
          <button
            type="button"
            className="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2  "
          >
            New Blog
          </button>
        </Link>
        <Avatar name={"Parth"} />
      </div>
    </div>
  );
}
