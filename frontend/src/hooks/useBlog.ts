import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import { useAuth } from "./useAuth";

export interface Blog {
  content: string;
  id: string;
  title: string;
  author: { name: string };
}

export const useBlog = ({ id }: { id: string | "" }) => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<Blog | undefined>();
  const navigateTo = useNavigate();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    const getBlog = async () => {
      try {
        if (!isLoggedIn) {
          navigateTo("/signin");
        } else {
          setLoading(true);
          const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          const data = res.data.blog;
          setBlog(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getBlog();
  }, [id, navigateTo, isLoggedIn]);

  return {
    blog,
    loading,
  };
};
