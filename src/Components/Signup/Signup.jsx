import React, { useState } from "react";
import authService from "../../AppWrite/Auth";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin, login } from "../../Store/AuthSlice";
import { Button, Input, Logo } from "../Index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const signUp = async (data) => {
    setError("");
    console.log(data, "data");
    try {
      const userData = await authService.createAccount(data);
      console.log(userData, "inside signup");
      if (userData) {
        await new Promise(res=>setTimeout(res,300))
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }else{
          setError("Sign Up succedded but failed to get the userData")
        }
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign In
        </h2>
        <p className="mt-2 text-center text-base text-black/60 ">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(signUp)}>
          <div className="space-y-5">
            <Input
              label="FullName:"
              placeholder="Enter Your Full Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email:"
              placeholder="Enter Your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "email address must be valid",
                },
              })}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter Your Password"
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
