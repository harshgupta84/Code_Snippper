import React, { useState, useEffect } from "react";
import { Button, Checkbox, Label, TextInput, FileInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";
import LoadingSpinner from "../utils/LodingSpinner";
import ErrorMessage from "../utils/ErrorMessage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useUserStore from "../../stores/userStore";
import { use } from "react";
import toast, { Toaster } from "react-hot-toast";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState("");


  const { userInfo, loading, error, success, updateProfile } = useUserStore();

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

  const postDetails = async (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      try {
        const formData = new FormData();
        formData.append("file", pics);
        formData.append("upload_preset", "codezipper"); // Replace "your_upload_preset" with your Cloudinary upload preset name

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dimugtqll/image/upload",
          formData
        );

        setPic(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      setPicMessage("Please Select a Valid Image (JPEG or PNG).");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword)
      updateProfile({ name, email, password, pic });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (

    <div className="flex justify-center items-center h-full">
      <Toaster />
      <div className="max-w-md mt-10 mb-10">
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          {success && (
            toast.success("Profile Updated Successfully")
          )}
          {error&& <ErrorMessage error={error} />}
          <div>
            <Label htmlFor="name" value="Name" />
            <TextInput
              id="name"
              type="text"
              placeholder="Enter Your Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email" value="Your Email" />
            <TextInput
              id="email"
              type="email"
              placeholder="Enter Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              placeholder="Enter Your Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="confirm-password" value="Confirm Password" />
            <TextInput
              id="confirm-password"
              type="password"
              placeholder="Confirm Your Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {picMessage && <ErrorMessage error={picMessage}></ErrorMessage>}
          <div>
            <Label
              htmlFor="file-upload-helper-text"
              value="Change Your Profile Picture"
            />
            <FileInput
              id="file-upload-helper-text"
              onChange={(e) => postDetails(e.target.files[0])}
              helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="agree" />
            <Label htmlFor="agree">
              I agree with the&nbsp;
              <Link
                to="#"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                terms and conditions
              </Link>
            </Label>
          </div>
          <Button type="submit">Update Information</Button>
        </form>
      </div>
      <div className="ml-10 h-32 w-32">
        <img src={pic} alt={name} className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default ProfileScreen;
