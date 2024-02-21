import React from "react";
import { Button } from "flowbite-react";
import Features from "./Features";
import RegisterScreen from "../Register/RegisterScreen";
import CreateNote from "../CreateNotes/CreateNote";
import { Accordion } from "flowbite-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className=" ">
      <div className="mt-20">
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Code
          </span>{" "}
          Snipper
        </h1>
        <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Here at Flowbite we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-16 justify-center ">
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
      </div>
      <div className=" mt-44 ml-20 mr-20 mb-10">
        <Features />
      </div>
    </div>
  );
};

export default LandingPage;
