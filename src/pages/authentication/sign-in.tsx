/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import type { FC, FormEvent } from "react";
import logo from "../../assets/logo.png";

const SignInPage: FC = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ Example authentication (replace with real backend logic)
    if (email === "admin@trackey.com" && password === "password123") {
      const userData = {
        email,
        token: "example-jwt-token",
      };

      localStorage.setItem("trackeyUser", JSON.stringify(userData));
      alert("Login successful!");

      // 🔁 Optionally redirect
      window.location.href = "/"; // Change this as needed
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <div className="mb-6 text-center">
          <img alt="Trackey logo" src={logo} className="mx-auto h-12" />
          <h1 className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
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
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign up
          </a>
        </p>
      </Card>
    </div>
  );
};

export default SignInPage;
