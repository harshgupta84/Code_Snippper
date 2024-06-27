import React from "react";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";
import Features from "./Features";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="mt-20 text-center">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Code Snipper
          </span>{" "}
          AI
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Here we focus on technology, innovation, and capital to unlock
          long-term value and drive economic growth.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-8 justify-center">
        {userInfo ? (
          <Link to="/mynotes">
            <Button size="xl" gradientDuoTone="greenToBlue">
              EXPLORE MY NOTES
            </Button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <Button size="xl" gradientDuoTone="purpleToBlue">
                LOGIN
              </Button>
            </Link>
            <Link to="/register">
              <Button size="xl" gradientDuoTone="cyanToBlue">
                SIGNUP
              </Button>
            </Link>
          </>
        )}
      </div>
      <div className="mt-20 w-full px-4 sm:px-8 lg:px-16">
        <Features />
      </div>
    </div>
  );
};

export default LandingPage;
