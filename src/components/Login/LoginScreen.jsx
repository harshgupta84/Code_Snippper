import React, { useState, useEffect } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Loading from "../utils/LodingSpinner";
import ErrorMessage from "../utils/ErrorMessage";
import useUserStore from "../../stores/userStore";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, userInfo, login } = useUserStore();

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      {error && <ErrorMessage error={error} />}
      <form
        className="w-full max-w-md flex flex-col gap-4"
        onSubmit={submitHandler}
      >
        <div>
          <Label htmlFor="email" value="Your email" className="mb-2 block" />
          <TextInput
            id="email"
            type="email"
            placeholder="name@flowbite.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password" value="Your password" className="mb-2 block" />
          <TextInput
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginScreen;
