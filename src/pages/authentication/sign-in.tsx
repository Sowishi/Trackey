/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import type { FC, FormEvent } from "react";
import logo from "../../assets/logo.png";
import Lottie from "lottie-react";
import welcome from "../../assets/welcome.json";

const SignInPage: FC = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "admin@trackey.com" && password === "password123") {
      const userData = {
        email,
        token: "example-jwt-token",
      };

      localStorage.setItem("trackeyUser", JSON.stringify(userData));
      alert("Login successful!");
      window.location.href = "/";
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex w-full max-w-5xl shadow-xl rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
        {/* Left - Login Form */}
        <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-8">
          <div className="text-center mb-6">
            <div className="inline-block p-2 rounded-full border-4 border-red-600 shadow-lg bg-white dark:bg-gray-900">
              <img
                src={logo}
                alt="Trackey logo"
                className="mx-auto h-12 transition-transform hover:scale-110"
              />
            </div>
            <h1 className="mt-3 text-3xl font-extrabold text-red-600 dark:text-red-400">
              Trackey
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Label htmlFor="email">Email address</Label>
              <TextInput
                id="email"
                name="email"
                placeholder="you@trackey.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <TextInput
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <Checkbox id="rememberMe" name="rememberMe" />
                <Label htmlFor="rememberMe">Remember me</Label>
              </div>
              <a
                href="#"
                className="text-sm text-red-600 hover:underline dark:text-red-400"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
            >
              Login
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Don’t have an account?{" "}
            <a
              href="#"
              className="text-red-600 hover:underline dark:text-red-400"
            >
              Sign up
            </a>
          </p>
        </div>

        {/* Right - Lottie Animation */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-200 dark:bg-gray-700">
          <Lottie animationData={welcome} />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
