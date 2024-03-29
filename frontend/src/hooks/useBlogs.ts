import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { Blog } from "./useBlog";
import { useAuth } from "./useAuth";

export const useBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigateTo = useNavigate();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    const getBlog = async () => {
      if (!isLoggedIn) {
        navigateTo("/signin");
      } else {
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = res.data;
        setBlogs(data.posts);
        setLoading(false);
      }
    };
    getBlog();
  }, [navigateTo, isLoggedIn]);

  return {
    loading,
    blogs,
  };
};
