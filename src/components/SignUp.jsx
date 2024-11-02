import React from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Input, Button, Logo } from "./index";
import { useForm } from "react-hook-form";
import { login } from "../store/authSlice";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
        const session = await authService.createAccount(data);
        console.log('Session created:', session); // Verify session creation
        const userData = await authService.getCurrentUser();
        console.log('User data:', userData); 
        if (userData) {
            dispatch(login({ userData })); // Ensure userData is an object
        }
        navigate("/");
    } catch (error) {
        setError(error.message);
    }
};


  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-slate-800 rounded-xl p-10 border border-white/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" className="h-28 w-28" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-slate-100">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-white/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              className="text-white"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              className="text-white"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              className="text-white"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
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

export default SignUp;
