import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import spotifyLogo from "../assets/spotify.png";
import API from "@/services/API";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/AuthStore";

interface SignUpFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  gender: yup.string().required("Gender is required"),
  phoneNumber: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .required("Phone number is required"),
});

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { setUserId } = useAuthStore();

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      const response = await API.post.signup(data);
      if (response.data.message === "User Created") {
        localStorage.clear();
        localStorage.setItem("Authorization", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        setUserId(response.data.userId);
        navigate("/home");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="bg-[#121212] w-full h-screen">
      <div className="max-w-fit bg-[#212121]  text-white p-6 mx-auto mt-10">
        <div className="flex items-center  mb-6">
          <h2 className="text-2xl font-bold">Sign Up to </h2>
          <div className="flex items-center m-2 max-h-10 gap-2">
            <img src={spotifyLogo} width={26} alt="Spotify Logo" />
            <p className="font-bold text-lg text-green-500 h-fit">Spotify</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mx-auto">
          <div className="flex gap-10">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                type="text"
                {...register("name")}
                className={`mt-1 block w-56 px-3 text-white py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium"
              >
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                type="text"
                {...register("phoneNumber")}
                className={`mt-1 block w-56 px-3 text-white py-2 border ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-10">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={`mt-1 block w-56 text-white px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="text-white ">
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium"
              >
                Date of Birth
              </label>
              <Input
                id="dateOfBirth"
                type="date"
                {...register("dateOfBirth")}
                className={`mt-1 block text-white w-56 px-3 py-2 border ${
                  errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-10">
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className={`mt-1 block text-white w-56 px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className={`mt-1 block text-white w-56 px-3 py-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              {...register("gender")}
              className={`mt-1 block  px-3 py-2 border ${
                errors.gender ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
