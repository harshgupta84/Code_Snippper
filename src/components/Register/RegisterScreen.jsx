import React, { useState, useEffect } from "react";
import { Button, Checkbox, Label, TextInput, FileInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import ErrorMessage from "../utils/ErrorMessage";
import LoadingSpinner from "../utils/LodingSpinner";
import useUserStore from "../../stores/userStore";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const { loading, error, userInfo, register } = useUserStore();

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      await register(name, email, password, pic);
      setMessage(null);
    }
  };


  const cloudinary = new Cloudinary({ cloud: { cloudName: "dimugtqll" } });

  const postDetails = async (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      try {
        const formData = new FormData();
        formData.append("file", pics);
        formData.append("upload_preset", "codezipper");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dimugtqll/image/upload",
          formData
        );

        setPic(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      setMessage("Please select a valid image (JPEG or PNG).");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 mb-4">
      {error && <ErrorMessage error={error}></ErrorMessage>}
      {message && <ErrorMessage error={message}></ErrorMessage>}

      <div className="w-full max-w-lg p-8 shadow-md rounded-lg">
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <div>
            <Label htmlFor="name" value="Your Name" />
            <TextInput
              id="name"
              type="name"
              placeholder="Name"
              required
              shadow
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email2" value="Your email" />
            <TextInput
              id="email2"
              type="email"
              placeholder="name@flowbite.com"
              required
              shadow
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password2" value="Your password" />
            <TextInput
              id="password2"
              type="password"
              required
              shadow
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="repeat-password" value="Repeat password" />
            <TextInput
              id="repeat-password"
              type="password"
              required
              shadow
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {picMessage && <ErrorMessage error={picMessage}></ErrorMessage>}
          <div>
            <Label
              htmlFor="file-upload-helper-text"
              value="Upload Your Profile Photo"
            />
            <FileInput
              id="file-upload-helper-text"
              onChange={(e) => postDetails(e.target.files[0])}
              helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="agree" />
            <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <Link
                to="#"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                terms and conditions
              </Link>
            </Label>
          </div>
          <Button type="submit">Register new account</Button>
        </form>
      </div>
      <div className="mt-10 w-48 h-48">
        {pic && (
          <CloudinaryContext cloudName="dimugtqll">
            <Image publicId={pic} width="200">
              <Transformation height="200" width="200" crop="thumb" />
            </Image>
          </CloudinaryContext>
        )}
      </div>
    </div>
  );
};

export default RegisterScreen;
