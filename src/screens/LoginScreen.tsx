// Login.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import API from "@/services/API";
import useAuthStore from "../store/AuthStore";
import spotifyLogo from "../assets/spotify.png";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserId } = useAuthStore();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await API.post.login(loginDetails);
      if (response.statusText === "OK") {
        setLoginDetails({ email: "", password: "" });
        localStorage.clear();
        localStorage.setItem("Authorization", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        setIsLoggedIn(true);
        setUserId(response.data.userId);
        navigate("/home");
        toast({
          variant: "default",
          title: "Success",
          description: "Logged in successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Oops try again",
          description: "Incorrect email or password",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#121212] mx-auto h-screen w-screen">
      <Card className="bg-[#212121]  text-card-foreground mx-auto max-w-sm translate-y-[25%]">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center">
            Login to
            <div className="flex items-center m-2 max-h-10 gap-2">
              <img src={spotifyLogo} width={26} alt="Spotify Logo" />
              <p className="font-bold text-lg text-green-500 h-fit">Spotify</p>
            </div>
          </CardTitle>
          <CardDescription className="text-white">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2 text-white">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={loginDetails.email}
                onChange={handleInputChange}
                className="w-72 text-white"
              />
            </div>
            <div className="grid gap-2 text-white">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="#"
                  className="ml-auto inline-block text-sm underline text-white "
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={loginDetails.password}
                onChange={handleInputChange}
                className="w-72 text-white  "
              />
            </div>
            <Button type="button" className="w-full" onClick={handleLogin}>
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-white">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-white font-bold no-underline hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
