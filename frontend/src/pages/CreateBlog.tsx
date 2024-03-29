import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import { BACKEND_URL } from "../config";
import { useAuth } from "../hooks/useAuth";

export default function CreateBlog() {
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const { isLoggedIn } = useAuth();
  const navigateTo = useNavigate();

  const publishPost = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    navigateTo(`/blog/${response.data.id}`);
  };
  useEffect(() => {
    if (!isLoggedIn) {
      navigateTo("/signin");
    }
  }, [navigateTo, isLoggedIn]);

  return (
    <div>
      <AppBar />
      <div className="flex justify-center w-full pt-10 flex-col items-center">
        <div className="max-w-screen-lg w-full">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500  "
          />
        </div>
        <textarea
          id="message"
          rows={20}
          onChange={(e) => setContent(e.target.value)}
          className=" mt-10 max-w-screen-lg w-full block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 pl-2 pr-2"
          placeholder="Write your thoughts here..."
        ></textarea>
        <div className=" max-w-screen-lg w-full">
          <button
            type="button"
            className="mt-10 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 max-w-7xl"
            onClick={publishPost}
          >
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
}
