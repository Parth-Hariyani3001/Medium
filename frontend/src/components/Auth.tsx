import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import InputBox from "./InputBox";
import { SignupInput } from "@parthxd/blog-types";
import { BACKEND_URL } from "../config";

export default function Auth({ type }: { type: "signup" | "signin" }) {
  const navigateTo = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/users/${
          type === "signup" ? "signup" : "signin"
        }`,
        postInputs
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigateTo("/blogs");
    } catch (e) {
      alert("There is an error");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigateTo("/blogs");
    }
  }, [navigateTo]);

  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="max-w-lg px-20 w-screen">
        <p className="text-3xl font-extrabold">
          {type === "signin" ? "Sign into your Account" : "Create an Account"}
        </p>
        <p className="text-slate-400 mb-4">
          {type === "signin"
            ? "Don't have an Account?  "
            : "Already have an account?  "}
          <Link
            className="p1-2 underline"
            to={type === "signin" ? "/signup" : "/signin"}
          >
            {type === "signin" ? "Signup" : "Signin"}
          </Link>
        </p>
        {type === "signup" ? (
          <InputBox
            label={"Name"}
            placeholder={"John Doe"}
            value={postInputs.name || ""}
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                name: e.target.value,
              }));
            }}
          />
        ) : null}
        <InputBox
          label={"Email"}
          placeholder={"Johndoe@gmail.com"}
          value={postInputs.email || ""}
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              email: e.target.value,
            }));
          }}
        />
        <InputBox
          label={"Password"}
          type={"password"}
          placeholder={"*********"}
          value={postInputs.password || ""}
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              password: e.target.value,
            }));
          }}
        />
        <div className="pt-4">
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full"
            onClick={sendRequest}
          >
            {type === "signin" ? "Singin" : "Signup"}
          </button>
        </div>
      </div>
    </div>
  );
}
